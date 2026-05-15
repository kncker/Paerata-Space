import { PRIORITY } from "../data/mockEmails";

function decodeBase64Url(data) {
  if (!data) return "";
  const fixed = data.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return decodeURIComponent(
      Array.from(atob(fixed))
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  } catch {
    return atob(fixed);
  }
}

function stripHtml(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s{3,}/g, "\n\n")
    .trim();
}

function extractBodyFromPart(part) {
  if (!part) return "";
  if (part.body?.data) {
    const decoded = decodeBase64Url(part.body.data);
    return part.mimeType === "text/html" ? stripHtml(decoded) : decoded;
  }
  if (part.parts) {
    const plain = part.parts.find((p) => p.mimeType === "text/plain");
    if (plain?.body?.data) return decodeBase64Url(plain.body.data);
    const html = part.parts.find((p) => p.mimeType === "text/html");
    if (html?.body?.data) return stripHtml(decodeBase64Url(html.body.data));
    for (const sub of part.parts) {
      const result = extractBodyFromPart(sub);
      if (result) return result;
    }
  }
  return "";
}

function getHeader(headers, name) {
  return headers?.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || "";
}

function parseFromHeader(from) {
  const match = from.match(/^"?([^"<]+?)"?\s*(?:<(.+?)>)?$/);
  if (match) {
    return { fromName: match[1].trim(), from: match[2]?.trim() || match[1].trim() };
  }
  return { fromName: from, from };
}

function classifyPriority(labelIds = []) {
  if (labelIds.includes("STARRED")) return PRIORITY.URGENT;
  if (labelIds.includes("IMPORTANT") && labelIds.includes("UNREAD")) return PRIORITY.ACTION;
  if (labelIds.includes("UNREAD")) return PRIORITY.ACTION;
  if (labelIds.includes("IMPORTANT")) return PRIORITY.IMPORTANT;
  return PRIORITY.IMPORTANT;
}

export function parseMessageMeta(msg) {
  const headers = msg.payload?.headers || [];
  const fromRaw = getHeader(headers, "From");
  const { fromName, from } = parseFromHeader(fromRaw);
  const subject = getHeader(headers, "Subject") || "(no subject)";
  const date = msg.internalDate
    ? new Date(Number(msg.internalDate)).toISOString()
    : new Date().toISOString();

  return {
    id: msg.id,
    threadId: msg.threadId,
    priority: classifyPriority(msg.labelIds),
    from,
    fromName,
    subject,
    preview: msg.snippet || "",
    body: null,
    date,
    read: !msg.labelIds?.includes("UNREAD"),
    tags: [],
    labelIds: msg.labelIds || [],
  };
}

export function parseMessageFull(msg) {
  const meta = parseMessageMeta(msg);
  const body = extractBodyFromPart(msg.payload);
  return { ...meta, body };
}

export function buildReplyRaw({ to, fromEmail, subject, body, inReplyTo, references }) {
  const mime = [
    `From: ${fromEmail}`,
    `To: ${to}`,
    `Subject: ${subject.startsWith("Re:") ? subject : `Re: ${subject}`}`,
    inReplyTo ? `In-Reply-To: ${inReplyTo}` : "",
    references ? `References: ${references}` : "",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    body,
  ]
    .filter((l) => l !== "")  // drop empty optional headers
    .join("\r\n");

  return btoa(unescape(encodeURIComponent(mime)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

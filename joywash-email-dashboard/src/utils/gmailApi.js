import { GMAIL_BASE } from "../config";

async function request(path, token, options = {}) {
  const res = await fetch(`${GMAIL_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  if (!res.ok) throw new Error(`Gmail API ${res.status}`);
  return res.json();
}

export async function getProfile(token) {
  return request("/profile", token);
}

export async function listMessages(token, maxResults = 50) {
  return request(
    `/messages?labelIds=INBOX&maxResults=${maxResults}`,
    token
  );
}

export async function getMessageMeta(token, id) {
  const fields =
    "id,threadId,labelIds,snippet,payload/headers,internalDate";
  return request(
    `/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date&fields=${fields}`,
    token
  );
}

export async function getMessageFull(token, id) {
  return request(`/messages/${id}?format=full`, token);
}

export async function modifyMessage(token, id, { addLabels = [], removeLabels = [] }) {
  return request(`/messages/${id}/modify`, token, {
    method: "POST",
    body: JSON.stringify({ addLabelIds: addLabels, removeLabelIds: removeLabels }),
  });
}

export async function sendMessage(token, rawBase64Url, threadId) {
  return request("/messages/send", token, {
    method: "POST",
    body: JSON.stringify({ raw: rawBase64Url, ...(threadId ? { threadId } : {}) }),
  });
}

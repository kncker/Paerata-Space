import { useState, useEffect, useCallback, useRef } from "react";
import { listMessages, getMessageMeta, getMessageFull, modifyMessage, getProfile } from "../utils/gmailApi";
import { parseMessageMeta, parseMessageFull } from "../utils/emailParser";
import { INBOX_MAX_RESULTS } from "../config";

export function useEmails(token, setProfile) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheRef = useRef({});

  const fetchEmails = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [profileData, list] = await Promise.all([
        getProfile(token),
        listMessages(token, INBOX_MAX_RESULTS),
      ]);
      setProfile(profileData);

      const ids = (list.messages || []).map((m) => m.id);
      const metas = await Promise.all(ids.map((id) => getMessageMeta(token, id)));
      const parsed = metas.map(parseMessageMeta);
      setEmails(parsed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, setProfile]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  async function fetchBody(email) {
    if (email.body !== null) return email;
    if (cacheRef.current[email.id]) {
      const cached = cacheRef.current[email.id];
      setEmails((prev) => prev.map((e) => (e.id === email.id ? { ...e, body: cached } : e)));
      return { ...email, body: cached };
    }
    try {
      const full = await getMessageFull(token, email.id);
      const parsed = parseMessageFull(full);
      cacheRef.current[email.id] = parsed.body;
      setEmails((prev) => prev.map((e) => (e.id === email.id ? { ...e, body: parsed.body } : e)));
      return parsed;
    } catch {
      return email;
    }
  }

  async function markRead(email) {
    if (email.read) return;
    try {
      await modifyMessage(token, email.id, { removeLabels: ["UNREAD"] });
      setEmails((prev) =>
        prev.map((e) =>
          e.id === email.id
            ? { ...e, read: true, labelIds: e.labelIds.filter((l) => l !== "UNREAD") }
            : e
        )
      );
    } catch {}
  }

  async function markUnread(email) {
    if (!email.read) return;
    try {
      await modifyMessage(token, email.id, { addLabels: ["UNREAD"] });
      setEmails((prev) =>
        prev.map((e) =>
          e.id === email.id
            ? { ...e, read: false, labelIds: [...e.labelIds, "UNREAD"] }
            : e
        )
      );
    } catch {}
  }

  async function archive(id) {
    try {
      await modifyMessage(token, id, { removeLabels: ["INBOX"] });
      setEmails((prev) => prev.filter((e) => e.id !== id));
    } catch {}
  }

  async function markAllRead(filtered) {
    const unread = filtered.filter((e) => !e.read);
    await Promise.all(unread.map((e) => markRead(e)));
  }

  return { emails, setEmails, loading, error, fetchEmails, fetchBody, markRead, markUnread, archive, markAllRead };
}

import { useState } from "react";
import { sendMessage } from "../utils/gmailApi";
import { buildReplyRaw } from "../utils/emailParser";

export default function ReplyModal({ email, profile, token, onClose, onSent }) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSend() {
    if (!body.trim()) return;
    setSending(true);
    setError(null);
    try {
      const raw = buildReplyRaw({
        to: email.from,
        fromEmail: profile?.emailAddress || "",
        subject: email.subject,
        body: body.trim(),
        inReplyTo: email.id,
        references: email.id,
      });
      await sendMessage(token, raw, email.threadId);
      onSent?.();
      onClose();
    } catch (err) {
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Reply</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-to">
          <span className="modal-label">To:</span>
          <span className="modal-to-value">{email.fromName} &lt;{email.from}&gt;</span>
        </div>
        <div className="modal-to">
          <span className="modal-label">Subject:</span>
          <span className="modal-to-value">
            {email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`}
          </span>
        </div>

        <textarea
          className="modal-body"
          placeholder="Write your reply…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          autoFocus
        />

        {error && <div className="modal-error">{error}</div>}

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleSend} disabled={sending || !body.trim()}>
            {sending ? "Sending…" : "Send Reply"}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

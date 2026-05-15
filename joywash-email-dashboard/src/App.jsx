import { useState, useMemo } from "react";
import "./App.css";
import { mockEmails, PRIORITY } from "./data/mockEmails";

const VIEWS = {
  ALL: "all",
  URGENT: PRIORITY.URGENT,
  ACTION: PRIORITY.ACTION,
  IMPORTANT: PRIORITY.IMPORTANT,
};

const PRIORITY_LABELS = {
  [PRIORITY.URGENT]: "Urgent",
  [PRIORITY.ACTION]: "Action Needed",
  [PRIORITY.IMPORTANT]: "Important",
};

function formatDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString([], { day: "numeric", month: "short" });
}

function formatFullDate(iso) {
  return new Date(iso).toLocaleString([], {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function countByPriority(emails, priority) {
  return emails.filter((e) => e.priority === priority).length;
}

function unreadCount(emails, priority) {
  return emails.filter((e) => e.priority === priority && !e.read).length;
}

export default function App() {
  const [emails, setEmails] = useState(mockEmails);
  const [view, setView] = useState(VIEWS.ALL);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = view === VIEWS.ALL ? emails : emails.filter((e) => e.priority === view);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.fromName.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.preview.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    const order = [PRIORITY.URGENT, PRIORITY.ACTION, PRIORITY.IMPORTANT];
    return [...list].sort((a, b) => order.indexOf(a.priority) - order.indexOf(b.priority));
  }, [emails, view, search]);

  function selectEmail(email) {
    setSelected(email.id);
    if (!email.read) {
      setEmails((prev) => prev.map((e) => (e.id === email.id ? { ...e, read: true } : e)));
    }
  }

  function markAllRead() {
    setEmails((prev) =>
      prev.map((e) =>
        view === VIEWS.ALL || e.priority === view ? { ...e, read: true } : e
      )
    );
  }

  const selectedEmail = selected ? emails.find((e) => e.id === selected) : null;

  const urgentUnread = unreadCount(emails, PRIORITY.URGENT);
  const actionUnread = unreadCount(emails, PRIORITY.ACTION);
  const importantUnread = unreadCount(emails, PRIORITY.IMPORTANT);

  const paneTitle =
    view === VIEWS.ALL ? "All Emails" : PRIORITY_LABELS[view];

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <span className="header-logo">🫧</span>
          <div>
            <h1>JoyWash Email Dashboard</h1>
            <div className="header-sub">Prioritised inbox for your business</div>
          </div>
        </div>
        <div className="header-stats">
          {urgentUnread > 0 && (
            <span className="stat-chip urgent">🔴 {urgentUnread} urgent</span>
          )}
          {actionUnread > 0 && (
            <span className="stat-chip action">🟠 {actionUnread} action needed</span>
          )}
          {importantUnread > 0 && (
            <span className="stat-chip important">🔵 {importantUnread} important</span>
          )}
        </div>
      </header>

      <div className="body">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-label">Inbox</div>
          <div className="sidebar-section">
            <button
              className={`sidebar-btn ${view === VIEWS.ALL ? "active" : ""}`}
              onClick={() => setView(VIEWS.ALL)}
            >
              📥 All emails
              <span className="count">{emails.length}</span>
            </button>
          </div>

          <div className="sidebar-divider" />
          <div className="sidebar-label">Priority</div>
          <div className="sidebar-section">
            <button
              className={`sidebar-btn ${view === VIEWS.URGENT ? "active" : ""}`}
              data-priority="urgent"
              onClick={() => setView(VIEWS.URGENT)}
            >
              🔴 Urgent
              <span className="count">{countByPriority(emails, PRIORITY.URGENT)}</span>
            </button>
            <button
              className={`sidebar-btn ${view === VIEWS.ACTION ? "active" : ""}`}
              data-priority="action"
              onClick={() => setView(VIEWS.ACTION)}
            >
              🟠 Action Needed
              <span className="count">{countByPriority(emails, PRIORITY.ACTION)}</span>
            </button>
            <button
              className={`sidebar-btn ${view === VIEWS.IMPORTANT ? "active" : ""}`}
              data-priority="important"
              onClick={() => setView(VIEWS.IMPORTANT)}
            >
              🔵 Important
              <span className="count">{countByPriority(emails, PRIORITY.IMPORTANT)}</span>
            </button>
          </div>
        </nav>

        {/* Email list */}
        <div className="email-list-pane">
          <div className="pane-header">
            <div className="pane-title">
              <span
                className={`priority-dot ${view !== VIEWS.ALL ? view : ""}`}
                style={view === VIEWS.ALL ? { background: "#94a3b8" } : {}}
              />
              {paneTitle}
            </div>
            <div className="pane-count">
              {filtered.length} email{filtered.length !== 1 ? "s" : ""}
              {" · "}
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 11,
                  color: "#2563eb",
                  padding: 0,
                }}
                onClick={markAllRead}
              >
                Mark all read
              </button>
            </div>
          </div>

          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Search emails…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="email-list">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>No emails found</p>
              </div>
            ) : (
              filtered.map((email) => (
                <div
                  key={email.id}
                  className={`email-item ${!email.read ? "unread" : ""} ${
                    selectedEmail?.id === email.id ? "selected" : ""
                  }`}
                  onClick={() => selectEmail(email)}
                >
                  {!email.read && <span className="unread-dot" />}
                  <div className="email-from">{email.fromName}</div>
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-preview">{email.preview}</div>
                  <div className="email-meta">
                    <span className="email-date">{formatDate(email.date)}</span>
                    {view === VIEWS.ALL && (
                      <span className={`priority-badge ${email.priority}`}>
                        {PRIORITY_LABELS[email.priority]}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail pane */}
        <div className="detail-pane">
          {!selectedEmail ? (
            <div className="detail-placeholder">
              <span className="detail-placeholder-icon">📨</span>
              <p>Select an email to read it</p>
            </div>
          ) : (
            <>
              <div className="detail-header">
                <div className="detail-subject">{selectedEmail.subject}</div>
                <div className="detail-meta-row">
                  <span className={`priority-badge ${selectedEmail.priority}`}>
                    {PRIORITY_LABELS[selectedEmail.priority]}
                  </span>
                  <span className="detail-from">
                    <strong>{selectedEmail.fromName}</strong>
                    {" · "}
                    {selectedEmail.from}
                  </span>
                  <span className="detail-date">{formatFullDate(selectedEmail.date)}</span>
                </div>
                {selectedEmail.tags.length > 0 && (
                  <div className="detail-tags">
                    {selectedEmail.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="detail-body">
                <pre className="detail-body-text">{selectedEmail.body}</pre>
              </div>

              <div className="detail-actions">
                <button className="btn btn-primary">↩ Reply</button>
                <button className="btn btn-secondary">↪ Forward</button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setEmails((prev) =>
                      prev.map((e) =>
                        e.id === selectedEmail.id ? { ...e, read: !e.read } : e
                      )
                    )
                  }
                >
                  {selectedEmail.read ? "Mark unread" : "Mark read"}
                </button>
                <button className="btn btn-danger" style={{ marginLeft: "auto" }}>
                  🗑 Archive
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

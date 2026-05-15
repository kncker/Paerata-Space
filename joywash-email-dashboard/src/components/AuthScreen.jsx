import { GOOGLE_CLIENT_ID } from "../config";

export default function AuthScreen({ onSignIn, ready }) {
  const missingClientId = !GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "your-client-id-here.apps.googleusercontent.com";

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-logo">🫧</div>
        <h1 className="auth-title">JoyWash Email Dashboard</h1>
        <p className="auth-subtitle">
          Sign in with Gmail to see your prioritised business inbox
        </p>

        {missingClientId ? (
          <div className="auth-warning">
            <strong>Setup required</strong>
            <p>
              Copy <code>.env.example</code> to <code>.env</code> and add your
              Google OAuth Client ID to get started.
            </p>
            <ol>
              <li>Go to <strong>console.cloud.google.com</strong></li>
              <li>Create a project → Enable <strong>Gmail API</strong></li>
              <li>OAuth consent screen → add Gmail scopes</li>
              <li>Credentials → Create <strong>OAuth 2.0 Client ID</strong> (Web app)</li>
              <li>Add <code>http://localhost:5173</code> as an authorized JS origin</li>
              <li>Paste the Client ID into your <code>.env</code> file</li>
            </ol>
          </div>
        ) : (
          <button
            className="btn btn-google"
            onClick={onSignIn}
            disabled={!ready}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v8.51h12.84c-.57 2.99-2.24 5.52-4.73 7.22v6h7.66c4.48-4.13 7.21-10.22 7.21-17.18z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.15 15.9-5.81l-7.66-6c-2.15 1.45-4.92 2.3-8.24 2.3-6.34 0-11.7-4.28-13.62-10.04H2.46v6.19C6.42 42.56 14.62 48 24 48z"/>
              <path fill="#FBBC05" d="M10.38 28.45A14.93 14.93 0 0 1 9.5 24c0-1.55.27-3.06.88-4.45v-6.19H2.46A23.94 23.94 0 0 0 0 24c0 3.93.94 7.65 2.46 10.64l7.92-6.19z"/>
              <path fill="#EA4335" d="M24 9.51c3.55 0 6.74 1.22 9.25 3.62l6.93-6.93C35.92 2.38 30.48 0 24 0 14.62 0 6.42 5.44 2.46 13.36l7.92 6.19C12.3 13.79 17.66 9.51 24 9.51z"/>
            </svg>
            Sign in with Google
          </button>
        )}

        <div className="auth-priority-legend">
          <span className="legend-item"><span className="priority-dot urgent" />Urgent — needs you now</span>
          <span className="legend-item"><span className="priority-dot action" />Action Needed — respond soon</span>
          <span className="legend-item"><span className="priority-dot important" />Important — FYI</span>
        </div>
      </div>
    </div>
  );
}

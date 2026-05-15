import { useState, useEffect, useCallback, useRef } from "react";
import { GOOGLE_CLIENT_ID, GMAIL_SCOPES } from "../config";

export function useGmailAuth() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    function initClient() {
      clientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GMAIL_SCOPES,
        callback: (response) => {
          if (response.error) {
            console.error("OAuth error:", response.error);
            return;
          }
          setToken(response.access_token);
          // Token expires in ~1 hour — schedule a silent refresh
          const expiresIn = (response.expires_in - 60) * 1000;
          setTimeout(() => clientRef.current?.requestAccessToken({ prompt: "" }), expiresIn);
        },
      });
      setReady(true);
    }

    if (window.google?.accounts?.oauth2) {
      initClient();
    } else {
      // Wait for the GSI script to load
      const existing = document.querySelector("script[src*='accounts.google.com/gsi']");
      const script = existing || document.createElement("script");
      if (!existing) {
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", initClient);
      return () => script.removeEventListener("load", initClient);
    }
  }, []);

  const signIn = useCallback(() => {
    clientRef.current?.requestAccessToken({ prompt: "select_account" });
  }, []);

  const signOut = useCallback(() => {
    if (token) window.google?.accounts?.oauth2?.revoke(token, () => {});
    setToken(null);
    setProfile(null);
  }, [token]);

  return { token, profile, setProfile, ready, signIn, signOut };
}

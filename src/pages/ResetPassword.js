// src/pages/ResetPassword.js
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [canReset, setCanReset] = useState(false);

  useEffect(() => {
    let hash = window.location.hash;

    // Case: GitHub Pages + HashRouter → "#/#access_token=..."
    if (hash.includes("#/")) {
      const [, tokenPart] = hash.split("#/");
      if (tokenPart.startsWith("access_token")) {
        // Build new URL: "#/?access_token=..."
        const newUrl =
          window.location.origin + window.location.pathname + "#/?" + tokenPart;
        window.history.replaceState(null, "", newUrl);
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setCanReset(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setCanReset(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage(
        "✅ Password has been reset successfully! You can now log in."
      );
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h1>🔑 Reset Password</h1>

        {!canReset ? (
          <p className="reset-message">
            ❌ Invalid or expired reset link. Please request a new one.
          </p>
        ) : (
          <form onSubmit={handleReset}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="reset-input"
            />
            <input
              type="password"
              placeholder="Retype new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="reset-input"
            />
            <button type="submit" className="reset-button">
              Reset Password
            </button>
          </form>
        )}

        {message && <p className="reset-message">{message}</p>}
      </div>
    </div>
  );
}

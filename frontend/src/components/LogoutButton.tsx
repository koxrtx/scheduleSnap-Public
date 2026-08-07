"use client";

import { signOut } from "@hono/auth-js/react";

export default function LogoutButton() {
  return (
    <button
      className="mt-4 gsi-material-button"
      onClick={() =>
        signOut({
          callbackUrl: window.location.origin,
        })
      }
    >
      <span className="gsi-material-button-contents">
        ログアウト
      </span>
    </button>
  );
}
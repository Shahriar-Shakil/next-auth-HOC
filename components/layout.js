import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
export default function Layout({ children }) {
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <nav className="navbar">
        <div className="left">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/public">
            <a>Public</a>
          </Link>
        </div>

        <div className="right">
          <Link href="/user">
            <a>User</a>
          </Link>
          {token && (
            <button style={{ padding: "10px" }} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
      <div className="content" style={{ textAlign: "center" }}>
        {children}
      </div>
    </div>
  );
}

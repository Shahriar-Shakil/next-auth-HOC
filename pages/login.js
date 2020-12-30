import React from "react";
import { useAuth } from "../hooks/useAuth";
import { withUser } from "../hocs/withUser";
import { API_TOKEN } from "../lib/api-endpoint";
import { request } from "../config/api";
function Login() {
  const { login } = useAuth();

  async function handleLogin(username, password = "da1ssA#") {
    const {
      data: { access_token, token_type, expires_in },
    } = await request.post(API_TOKEN, {
      grant_type: "password",
      client_id: "1",
      client_secret: "YaJXq3Wmox3cOhqcCo1LchiMTIVZsMz4tGs1jkDr",
      scope: "*",
      username: "8785",
      password: "da1ssA#",
    });
    if (access_token) {
      login({ token: access_token, id: 8785 });
    }
  }

  return (
    <div>
      <button
        style={{ padding: "20px", backgroundColor: "green" }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
export default withUser(Login);

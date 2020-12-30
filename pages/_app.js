import Layout from "../components/layout";
import "../styles/globals.css";
import { useState, useEffect, createContext } from "react";
import cookies from "js-cookie";
import { trigger, mutate } from "swr";
import { API_USER } from "../lib/api-endpoint";
import Router from "next/router";
import { request } from "../config/api";
import { SWRConfig } from "swr";
export const UserContext = createContext();
const fetcher = (url) => request.post(url).then((r) => r.data);
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  // get the token from the cookie
  const cookieToken = cookies.get("token");

  // login function to be called on a login page
  const login = ({ id, token }) => {
    console.log(token);
    // save the token from the login response in a cookie
    cookies.set("token", token, { expires: 14 });
    // save the userId from the login response in a cookie
    cookies.set("userId", id, { expires: 14 });
    // setUser(user);
    setToken(token);
    trigger(API_USER);
    Router.push("/");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    cookies.remove("token");
    // invalidate the user with swr
    mutate(API_USER, {}, false);
    Router.push("/login");
  };

  useEffect(() => {
    if (cookieToken) setToken(cookieToken);
  }, []);
  return (
    <SWRConfig value={{ fetcher }}>
      <UserContext.Provider
        value={{
          user: user,
          token: cookieToken || token,
          login: login,
          logout: logout,
          setUser: setUser,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </SWRConfig>
  );
}

export default MyApp;

import { useEffect, useState } from "react";
import cookie from "js-cookie";
import useSWR from "swr";
import Router from "next/router";
import { useAuth } from "../hooks/useAuth";
import { API_USER } from "../lib/api-endpoint";
import { request } from "../config/api";

function getRedirectTo() {
  if (typeof window !== "undefined" && window.location) {
    return window.location;
  }
  return {};
}
export const withUser = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { setUser } = useAuth();
    const [token, setToken] = useState();
    const [shouldFetchUser, setShouldFetchUser] = useState(false);
    const [shouldGetUser, setShouldGetUser] = useState(false);
    const cookieUserId = cookie.get("userId");
    const cookieToken = cookie.get("token");

    const { data: fetchedUser } = useSWR(
      shouldFetchUser ? [API_USER, token] : null
    );
    console.log(fetchedUser, "fetchedUser");
    useEffect(() => {
      const redir = getRedirectTo();
      if (cookieToken && cookieUserId) {
        setToken(cookieToken);
        setShouldGetUser(true);
        setShouldFetchUser(true);
        request.defaults.headers.Authorization = `${"Bearer"} ${cookieToken}`;
      } else {
        Router.replace(
          `/login?r=${redir.pathname + encodeURIComponent(redir.search)}`,
          "/login",
          { shallow: true }
        );
      }
    }, [shouldGetUser]);
    useEffect(() => {
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    }, [fetchedUser]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

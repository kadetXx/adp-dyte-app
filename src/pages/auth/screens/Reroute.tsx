import { Loader } from "@adp/common";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Reroute = () => {
  const updated = useRef(false);
  const navigate = useNavigate();
  
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated || updated.current) return;

    const key = import.meta.env.VITE_AUTH_CALLBACK_STORAGE_KEY;
    const callbackUrl = sessionStorage.getItem(key);

    sessionStorage.removeItem(key);
    updated.current = true;

    callbackUrl ? window.location.replace(callbackUrl) : navigate("/meeting");
  }, [isAuthenticated]);

  return <Loader fullScreen />;
};

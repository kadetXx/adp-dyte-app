import React, { useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { SignIn } from "./screens/SignIn";
import { Reroute } from "./screens/Reroute";

export const Auth = () => {
  const [search] = useSearchParams();

  useEffect(() => {
    const key = import.meta.env.VITE_AUTH_CALLBACK_STORAGE_KEY;
    const callbackUrl = search.get("callbackUrl");

    callbackUrl && sessionStorage.setItem(key, callbackUrl);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/auth" element={<Reroute />} />
    </Routes>
  );
};

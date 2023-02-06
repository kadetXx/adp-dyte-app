import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./screens/SignIn";
import { Reroute } from "./screens/Reroute";

export const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/auth" element={<Reroute />} />
    </Routes>
  );
};

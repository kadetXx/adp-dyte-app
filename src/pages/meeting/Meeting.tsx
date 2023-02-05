import React from "react";
import { Route, Routes } from "react-router-dom";
import { Create } from "./screens/Create";
import { Call } from "./screens/Call";

export const Meeting = () => {
  return (
    <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/:room/:id" element={<Call />} />
    </Routes>
  );
};

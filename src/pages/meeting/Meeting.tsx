import React from "react";
import { Route, Routes } from "react-router-dom";
import { MeetingPageProps } from "./types";
import { Create } from "./screens/Create";
import { Call } from "./screens/Call";

export const Meeting: React.FC<MeetingPageProps> = ({ socket }) => {
  return (
    <Routes>
      <Route path="/" element={<Create socket={socket} />} />
      <Route path="/:title/:id" element={<Call />} />
    </Routes>
  );
};

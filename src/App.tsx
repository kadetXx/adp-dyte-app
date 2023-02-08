import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";

import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { globalStyles, Loader } from "@adp/common";

import { Auth } from "./pages/auth/Auth";
import { Meeting } from "./pages/meeting/Meeting";

const socket = io(import.meta.env.VITE_ADP_SERVER_URL);

function App() {
  globalStyles();

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    if (!user?.email) return;

    /**
     * websocket events to emit login to server
     * and to listen for logout from meeting app
     */
    socket.emit("login", user.email);
    socket.on("logout", logout);

    return () => {
      socket.off(user.email);
    };
  }, [user]);

  useLayoutEffect(() => {
    !isLoading && !isAuthenticated && navigate("/");
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="/*" element={<Auth />} />
        <Route path="/meeting/*" element={<Meeting socket={socket} />} />
      </Routes>
    </>
  );
}

export default App;

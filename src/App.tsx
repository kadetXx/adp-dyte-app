import { Route, Routes, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { globalStyles, Loader } from "@adp/common";

import { Auth } from "./pages/auth/Auth";
import { Meeting } from "./pages/meeting/Meeting";

function App() {
  globalStyles();

  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

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
        <Route path="/meeting/*" element={<Meeting />} />
      </Routes>
    </>
  );
}

export default App;

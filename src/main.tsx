import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_ISSUER_BASEURL}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID}
      onRedirectCallback={() => {
        const key = import.meta.env.VITE_AUTH_CALLBACK_STORAGE_KEY;
        const url = sessionStorage.getItem(key);

        if (url) {
          sessionStorage.removeItem(key)
          window.location.href = url;
        }
      }}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_IDENTIFIER,
      }}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);

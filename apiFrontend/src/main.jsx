import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import DeleteProvider from "./shared/store/DeleteProvider.jsx";
import DeleteModal from "./shared/components/DeleteModal.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="982448459986-5unagk80mo19sngts0hta1l5rgt0bahq.apps.googleusercontent.com">
      <DeleteProvider>
        <App />
        <DeleteModal />
      </DeleteProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import DeleteProvider from "./shared/store/DeleteProvider.jsx";
import DeleteModal from "./shared/components/DeleteModal.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="27057986801-5i6fa4h624mq0dla3k106hd94cnhm6b7.apps.googleusercontent.com">
      <DeleteProvider>
        <App />
        <DeleteModal />
      </DeleteProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

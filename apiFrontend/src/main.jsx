import {StrictMode} from "react";
import "./index.css";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import DeleteProvider from "./context/DeleteProvider";
import DeleteModal from "./components/DeleteModal";
import {ProjectStoreProvider} from "./context/ProjectStore.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DeleteProvider>
      <ProjectStoreProvider>
        <App />
        <DeleteModal /> {/* GLOBAL MODAL HERE */}
      </ProjectStoreProvider>
    </DeleteProvider>
  </BrowserRouter>,
);

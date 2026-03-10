import "./index.css";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import DeleteProvider from "./shared/store/DeleteProvider.jsx";
import DeleteModal from "./shared/components/DeleteModal.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DeleteProvider>
      <App />
      <DeleteModal /> {/* GLOBAL MODAL HERE */}
    </DeleteProvider>
  </BrowserRouter>,
);

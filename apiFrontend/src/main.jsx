import "./index.css";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import DeleteProvider from "./shared/store/DeleteProvider.jsx";
import DeleteModal from "./shared/components/DeleteModal.jsx";
import {ProjectStoreProvider} from "./features/project/store/ProjectStore.jsx";

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

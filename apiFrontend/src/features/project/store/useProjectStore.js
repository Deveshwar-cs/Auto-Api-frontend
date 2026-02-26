import {useContext} from "react";
import ProjectStoreContext from "./ProjectStoreContext";

const useProjectStore = () => useContext(ProjectStoreContext);

export default useProjectStore;

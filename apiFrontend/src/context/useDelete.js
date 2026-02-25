import {useContext} from "react";
import DeleteContext from "./DeleteContext";

const useDelete = () => useContext(DeleteContext);

export default useDelete;

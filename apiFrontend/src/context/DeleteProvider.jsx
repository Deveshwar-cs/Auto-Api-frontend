import {useState} from "react";
import DeleteContext from "./DeleteContext";

const DeleteProvider = ({children}) => {
  const [deleteState, setDeleteState] = useState(null);

  const openDelete = ({title, message, onConfirm}) => {
    setDeleteState({title, message, onConfirm});
  };

  const closeDelete = () => setDeleteState(null);

  return (
    <DeleteContext.Provider value={{deleteState, openDelete, closeDelete}}>
      {children}
    </DeleteContext.Provider>
  );
};

export default DeleteProvider;

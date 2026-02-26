import useDelete from "../store/useDelete";

const DeleteModal = () => {
  const {deleteState, closeDelete} = useDelete();

  if (!deleteState) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-100 animate-scaleIn">
        <h2 className="text-xl font-semibold text-gray-800">
          {deleteState.title}
        </h2>

        <p className="text-gray-500 mt-2">{deleteState.message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closeDelete}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              deleteState.onConfirm();
              closeDelete();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

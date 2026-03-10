import CollectionForm from "./CollectionForm";

const CollectionModal = ({onClose, collection}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1B1330] w-200 max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            {collection ? "Edit Collection" : "Create Collection"}
          </h2>

          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>

        <CollectionForm collection={collection} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default CollectionModal;

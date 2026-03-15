import {AlertTriangle} from "lucide-react";

const ConfirmModal = ({title, message, onConfirm, onCancel}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1B1330] border border-purple-900/30 rounded-xl p-6 w-100">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-yellow-400" size={22} />
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>

        <p className="text-sm text-gray-400 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg
            bg-[#241A40] border border-purple-800/30
            text-gray-300 hover:bg-purple-900/20"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg
            bg-purple-600 hover:bg-purple-700 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

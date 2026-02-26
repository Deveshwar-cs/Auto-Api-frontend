import CollectionList from "../components/CollectionList.jsx";
import CollectionForm from "../components/CollectionsForm.jsx";
import GeneratedFile from "../components/GeneratedFile.jsx";
import {useNavigate} from "react-router-dom";

const CollectionPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Manage Collections
          </h1>
          <p className="text-gray-500 mt-2">
            Organize and manage your project collections efficiently
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <h2 className="text-xl font-semibold text-indigo-600 mb-6">
            Create New Collection
          </h2>

          {/* ❌ no props */}
          <CollectionForm />
        </div>

        {/* List Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-indigo-600 mb-6">
            Your Collections
          </h2>

          {/* ❌ no props */}
          <CollectionList />

          <div className="text-center mt-8 mb-8">
            <button
              onClick={() => navigate("/schema")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
              View Schema Diagram
            </button>
          </div>

          <h2 className="text-2xl font-bold mt-16 mb-6">
            Generated Backend Files
          </h2>

          {/* ❌ no props */}
          <GeneratedFile />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;

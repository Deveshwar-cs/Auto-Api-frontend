import SchemaDiagram from "../components/SchemaDiagram";
import {useNavigate} from "react-router-dom";

const SchemaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Schema Visualization
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          ← Back
        </button>
      </div>

      {/* Full Width Diagram */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <SchemaDiagram />
      </div>
    </div>
  );
};

export default SchemaPage;

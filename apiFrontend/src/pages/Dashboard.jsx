import useProjectStore from "../context/useProjectStore";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

const Dashboard = () => {
  const {projects, loading} = useProjectStore();

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-14 text-center">
          Backend Project Generator
        </h1>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10 mb-16">
          <ProjectForm />
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
          {loading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : (
            <ProjectList projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

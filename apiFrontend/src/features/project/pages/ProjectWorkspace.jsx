import {useParams, NavLink, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import PageHeader from "../../../components/ui/PageHeader";
import StatCard from "../../../components/ui/StatCard";
import {Database, FileCode, Settings, Plus} from "lucide-react";
import useProjectStore from "../store/useProjectStore";
import {useProject} from "../../../shared/store/useProject";
import CollectionModal from "../components/CollectionModel";

const ProjectWorkspace = () => {
  const {projectId} = useParams();
  const location = useLocation();
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const projects = useProjectStore((state) => state.projects);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const updateProject = useProjectStore((state) => state.updateProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const fetchGeneratedFiles = useProject((state) => state.fetchGeneratedFiles);
  const collections = useProject((state) => state.collections);
  const files = useProject((state) => state.files);
  const fetchCollections = useProject((state) => state.fetchCollections);
  // 🔥 make sure addCollection exists in your store
  const addCollection = useProject((state) => state.addCollection);
  const [showModal, setShowModal] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const project = projects.find((p) => p._id === projectId);
  useEffect(() => {
    fetchProjects();
    fetchGeneratedFiles(projectId);
    fetchCollections(projectId);
  }, [fetchProjects, fetchGeneratedFiles, projectId, fetchCollections]);
  if (!project) {
    return <div className="text-white p-6">Project not found</div>;
  }

  const basePath = `/dashboard/projects/${projectId}`;
  const isCollectionsTab = location.pathname === basePath;

  const handleCreateCollection = () => {
    if (!collectionName.trim()) return;

    addCollection({
      id: Date.now().toString(),
      name: collectionName,
      projectId,
    });

    setCollectionName("");
    setShowModal(false);
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        title={project.projectName}
        subtitle={`Project ID: ${projectId}`}
        action={
          isCollectionsTab && (
            <button
              onClick={() => setShowCollectionModal(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg text-sm font-medium text-white"
            >
              + Create Collection
            </button>
          )
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Collections"
          value={collections?.length || 0}
          icon={<Database size={20} />}
        />
        <StatCard
          title="Generated Files"
          value={files?.length || 0}
          icon={<FileCode size={20} />}
        />
        <StatCard
          title="Settings"
          value="Configured"
          icon={<Settings size={20} />}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-purple-900/20 mb-6">
        <Tab to={basePath} label="Collections" end />
        <Tab to={`${basePath}/files`} label="Generated Files" />
        <Tab to={`${basePath}/docs`} label="API Docs" />
        <Tab to={`${basePath}/settings`} label="Settings" />
      </div>

      {/* Tab Content */}
      <Outlet
        context={{
          project,
          projectId,
          collections,
          files,
          updateProject,
          deleteProject,
        }}
      />

      {/* Create Collection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-105 bg-[#1B1330] border border-purple-900/20 rounded-2xl shadow-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Create New Collection
            </h2>

            <input
              type="text"
              placeholder="Enter collection name"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateCollection();
              }}
              autoFocus
              className="w-full bg-[#241A40] border border-purple-800/30 rounded-lg px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-purple-600 mb-5"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateCollection}
                className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showCollectionModal && (
        <CollectionModal onClose={() => setShowCollectionModal(false)} />
      )}
    </div>
  );
};

const Tab = ({to, label, end}) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({isActive}) =>
        `pb-3 text-sm font-medium transition ${
          isActive
            ? "text-purple-400 border-b-2 border-purple-500"
            : "text-gray-400 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default ProjectWorkspace;

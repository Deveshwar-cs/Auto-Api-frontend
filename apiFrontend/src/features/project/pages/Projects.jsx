import {useState, useEffect} from "react";
import PageHeader from "../../../components/ui/PageHeader";
import SectionCard from "../../../components/ui/SectionCard";
import EmptyState from "../../../components/ui/EmptyState";
import {Plus, Folder, Trash2} from "lucide-react";
import useProjectStore from "../store/useProjectStore";
import useDelete from "../../../shared/store/useDelete";
import ProjectModal from "../components/ProjectModal";
import {useNavigate} from "react-router-dom";

const Projects = () => {
  const projects = useProjectStore((state) => state.projects);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const {openDelete} = useDelete(); // 🔥 use global delete modal
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = (e, project) => {
    e.stopPropagation();

    openDelete({
      title: "Delete Project?",
      message: `Are you sure you want to delete "${project.projectName}"? This action cannot be undone.`,
      onConfirm: () => deleteProject(project._id),
    });
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Manage and organize your backend architectures"
        action={
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-purple-600 
                       hover:bg-purple-700 transition 
                       px-4 py-2 rounded-lg text-sm 
                       font-medium text-white shadow-lg"
          >
            <Plus size={16} />
            Create Project
          </button>
        }
      />

      <SectionCard>
        {projects.length === 0 ? (
          <EmptyState
            title="No Projects Yet"
            description="Start by creating your first backend project."
            action={
              <button
                onClick={() => setOpenModal(true)}
                className="flex items-center gap-2 bg-purple-600 
                           hover:bg-purple-700 transition 
                           px-4 py-2 rounded-lg text-sm 
                           font-medium text-white"
              >
                <Plus size={16} />
                Create Project
              </button>
            }
          />
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/dashboard/projects/${project._id}`)}
                className="flex items-center justify-between 
                           p-4 rounded-xl 
                           bg-[#1B1330] hover:bg-[#241A40] 
                           transition cursor-pointer 
                           border border-purple-900/20 
                           group"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Folder size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      {project.projectName}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {project.collectionsCount || 0} collections
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleDelete(e, project)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400
                               hover:bg-red-500/20 hover:text-red-500
                               opacity-0 group-hover:opacity-100
                               transition"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="text-xs text-purple-400 group-hover:translate-x-1 transition">
                    Open →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <ProjectModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Projects;

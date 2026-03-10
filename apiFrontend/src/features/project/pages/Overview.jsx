import {useEffect} from "react";
import PageHeader from "../../../components/ui/PageHeader";
import StatCard from "../../../components/ui/StatCard";
import SectionCard from "../../../components/ui/SectionCard";
import {Folder, Database, Activity} from "lucide-react";
import useDashboardStore from "../store/useDashboardStore";

const Overview = () => {
  const {stats, recentProjects, fetchStats} = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Overview"
        subtitle="Monitor your Auto API projects and activity"
      />

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={stats?.totalProjects || 0}
          icon={<Folder size={20} />}
        />

        <StatCard
          title="Total Collections"
          value={stats?.totalCollections || 0}
          icon={<Database size={20} />}
        />

        <StatCard
          title="Total APIs"
          value={stats?.totalApis || 0}
          icon={<Activity size={20} />}
        />
      </div>

      {/* Recent Projects */}
      <SectionCard title="Recent Projects">
        {recentProjects?.length === 0 ? (
          <p className="text-gray-400 text-sm">No projects created yet.</p>
        ) : (
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project._id}
                className="flex items-center justify-between bg-[oklch(0.14_0.02_252.45)] p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-3">
                  <Folder size={16} className="text-gray-400" />
                  <span className="text-sm font-medium">
                    {project.projectName}
                  </span>
                </div>

                <span className="text-xs text-gray-400">
                  {formatDateTime(project.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default Overview;

import {
  FolderKanban,
  Clock3,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

function DashboardStats({ projects }) {
  const total = projects.length;

  const pending = projects.filter(
    (project) =>
      project.status === "Pending"
  ).length;

  const approved = projects.filter(
    (project) =>
      project.status === "Approved"
  ).length;

  const rejected = projects.filter(
    (project) =>
      project.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total Projects",
      value: total,
      icon: <FolderKanban size={26} />,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock3 size={26} />,
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: approved,
      icon: <CircleCheckBig size={26} />,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <CircleX size={26} />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                {stat.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stat.value}
              </h2>
            </div>

            <div
              className={`${stat.color} text-white p-3 rounded-xl`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
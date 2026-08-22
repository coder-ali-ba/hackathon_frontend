import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  FileText,
  LogOut,
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  Search,
  Bell,
  UserCheck,
  FolderCheck,
  Clock,
} from "lucide-react";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ali Khan",
      email: "ali@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Ahmed Raza",
      email: "ahmed@example.com",
      role: "Project Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "Sara Ahmed",
      email: "sara@example.com",
      role: "User",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Usman Ali",
      email: "usman@example.com",
      role: "User",
      status: "Active",
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      manager: "Ahmed Raza",
      status: "Pending",
      members: 4,
    },
    {
      id: 2,
      title: "AI Chatbot",
      category: "Artificial Intelligence",
      manager: "Ali Khan",
      status: "Approved",
      members: 3,
    },
    {
      id: 3,
      title: "Student Portal",
      category: "Web Development",
      manager: "Ahmed Raza",
      status: "Pending",
      members: 6,
    },
    {
      id: 4,
      title: "Fitness Mobile App",
      category: "Mobile Development",
      manager: "Sara Ahmed",
      status: "Rejected",
      members: 2,
    },
  ]);

  const menuItems = [
    {
      name: "Dashboard",
      value: "dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      value: "users",
      icon: Users,
    },
    {
      name: "Projects",
      value: "projects",
      icon: FolderKanban,
    },
    {
      name: "Statistics",
      value: "statistics",
      icon: BarChart3,
    },
    {
      name: "Reports",
      value: "reports",
      icon: FileText,
    },
  ];

  const suspendUser = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Suspended"
                  ? "Active"
                  : "Suspended",
            }
          : user
      )
    );
  };

  const approveProject = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, status: "Approved" }
          : project
      )
    );
  };

  const rejectProject = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, status: "Rejected" }
          : project
      )
    );
  };

  const removeProject = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this project?"
    );

    if (confirmDelete) {
      setProjects(
        projects.filter((project) => project.id !== id)
      );
    }
  };

  const statusStyle = (status) => {
    if (status === "Active" || status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Suspended" || status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-slate-900 text-white p-5 fixed">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">
            A
          </div>

          <div>
            <h1 className="font-bold text-lg">
              Project Hub
            </h1>

            <p className="text-xs text-gray-400">
              Admin Panel
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.value}
                onClick={() => setActivePage(item.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activePage === item.value
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </div>

        <button className="absolute bottom-8 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition">
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1">
        {/* HEADER */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Admin Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Manage your platform from one place.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell size={22} />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                A
              </div>

              <div>
                <p className="font-semibold text-sm">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">

          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Platform Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={users.length}
                  icon={<Users />}
                />

                <StatCard
                  title="Total Projects"
                  value={projects.length}
                  icon={<FolderKanban />}
                />

                <StatCard
                  title="Pending Projects"
                  value={
                    projects.filter(
                      (project) =>
                        project.status === "Pending"
                    ).length
                  }
                  icon={<Clock />}
                />

                <StatCard
                  title="Active Users"
                  value={
                    users.filter(
                      (user) =>
                        user.status === "Active"
                    ).length
                  }
                  icon={<UserCheck />}
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                <div className="bg-white border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">
                      Recent Users
                    </h3>

                    <button
                      onClick={() =>
                        setActivePage("users")
                      }
                      className="text-sm text-indigo-600"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {users.slice(0, 4).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <p className="font-medium">
                            {user.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">
                      Recent Projects
                    </h3>

                    <button
                      onClick={() =>
                        setActivePage("projects")
                      }
                      className="text-sm text-indigo-600"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {projects.slice(0, 4).map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <p className="font-medium">
                            {project.title}
                          </p>

                          <p className="text-sm text-gray-500">
                            {project.category}
                          </p>
                        </div>

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* USERS */}
          {activePage === "users" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  All Users
                </h2>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    placeholder="Search users..."
                    className="border rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4">
                          User
                        </th>

                        <th className="text-left px-6 py-4">
                          Role
                        </th>

                        <th className="text-left px-6 py-4">
                          Status
                        </th>

                        <th className="text-left px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="border-t"
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium">
                              {user.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            {user.role}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                                user.status
                              )}`}
                            >
                              {user.status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                suspendUser(user.id)
                              }
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                user.status === "Suspended"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              <Ban size={16} />

                              {user.status === "Suspended"
                                ? "Activate"
                                : "Suspend"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* PROJECTS */}
          {activePage === "projects" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                All Projects
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border rounded-2xl p-6"
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">
                          {project.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {project.category}
                        </p>
                      </div>

                      <span
                        className={`h-fit text-xs px-3 py-1 rounded-full ${statusStyle(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="mt-5 text-sm text-gray-600 space-y-2">
                      <p>
                        <span className="font-medium">
                          Manager:
                        </span>{" "}
                        {project.manager}
                      </p>

                      <p>
                        <span className="font-medium">
                          Members:
                        </span>{" "}
                        {project.members}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      {project.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              approveProject(project.id)
                            }
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl"
                          >
                            <CheckCircle size={17} />
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectProject(project.id)
                            }
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl"
                          >
                            <XCircle size={17} />
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() =>
                          removeProject(project.id)
                        }
                        className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-xl hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STATISTICS */}
          {activePage === "statistics" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Platform Statistics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={users.length}
                  icon={<Users />}
                />

                <StatCard
                  title="Active Users"
                  value={
                    users.filter(
                      (user) =>
                        user.status === "Active"
                    ).length
                  }
                  icon={<UserCheck />}
                />

                <StatCard
                  title="Approved Projects"
                  value={
                    projects.filter(
                      (project) =>
                        project.status === "Approved"
                    ).length
                  }
                  icon={<FolderCheck />}
                />

                <StatCard
                  title="Pending Approval"
                  value={
                    projects.filter(
                      (project) =>
                        project.status === "Pending"
                    ).length
                  }
                  icon={<Clock />}
                />
              </div>

              <div className="bg-white rounded-2xl border p-8 mt-8">
                <h3 className="font-bold text-lg mb-4">
                  Platform Summary
                </h3>

                <p className="text-gray-500">
                  This section will show charts and detailed
                  platform analytics when connected to the backend.
                </p>
              </div>
            </>
          )}

          {/* REPORTS */}
          {activePage === "reports" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Platform Reports
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <ReportCard
                  title="User Activity Report"
                  description="View user registrations, activity and suspended accounts."
                />

                <ReportCard
                  title="Project Report"
                  description="View approved, rejected and pending projects."
                />

                <ReportCard
                  title="Platform Summary"
                  description="Overall platform performance and statistics."
                />
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ReportCard({ title, description }) {
  return (
    <div className="bg-white border rounded-2xl p-6 hover:shadow-lg transition">
      <FileText className="text-indigo-600 mb-4" size={30} />

      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>

      <button className="mt-5 text-indigo-600 font-medium">
        View Report →
      </button>
    </div>
  );
}

export default AdminDashboard;

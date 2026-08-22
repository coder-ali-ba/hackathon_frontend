import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ClipboardList,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  UserPlus,
  Calendar,
  LogOut,
  Bell,
  Search,
  Clock,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

function ManagerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A modern online shopping platform.",
      deadline: "2026-09-20",
      progress: 70,
      status: "Active",
      members: 5,
    },
    {
      id: 2,
      title: "AI Chatbot",
      category: "Artificial Intelligence",
      description: "Smart AI chatbot for students.",
      deadline: "2026-10-10",
      progress: 35,
      status: "Active",
      members: 3,
    },
    {
      id: 3,
      title: "Student Portal",
      category: "Web Development",
      description: "Student management portal.",
      deadline: "2026-11-01",
      progress: 10,
      status: "Planning",
      members: 2,
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Ali Khan",
      email: "ali@gmail.com",
      project: "E-Commerce Platform",
      skill: "React Developer",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara@gmail.com",
      project: "AI Chatbot",
      skill: "UI/UX Designer",
      status: "Pending",
    },
    {
      id: 3,
      name: "Usman Ali",
      email: "usman@gmail.com",
      project: "Student Portal",
      skill: "Node.js Developer",
      status: "Pending",
    },
  ]);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Ahmed Raza",
      project: "E-Commerce Platform",
      role: "Frontend Developer",
    },
    {
      id: 2,
      name: "Fatima Khan",
      project: "E-Commerce Platform",
      role: "Backend Developer",
    },
    {
      id: 3,
      name: "Bilal Ahmed",
      project: "AI Chatbot",
      role: "AI Developer",
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Login Page",
      project: "E-Commerce Platform",
      assignedTo: "Ahmed Raza",
      deadline: "2026-08-30",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Create API",
      project: "E-Commerce Platform",
      assignedTo: "Fatima Khan",
      deadline: "2026-09-05",
      status: "Pending",
    },
    {
      id: 3,
      title: "Train AI Model",
      project: "AI Chatbot",
      assignedTo: "Bilal Ahmed",
      deadline: "2026-09-15",
      status: "In Progress",
    },
  ]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    description: "",
    deadline: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    project: "",
    assignedTo: "",
    deadline: "",
  });

  const menuItems = [
    {
      name: "Dashboard",
      value: "dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Projects",
      value: "projects",
      icon: FolderKanban,
    },
    {
      name: "Applications",
      value: "applications",
      icon: UserPlus,
    },
    {
      name: "Tasks",
      value: "tasks",
      icon: ClipboardList,
    },
    {
      name: "Members",
      value: "members",
      icon: Users,
    },
    {
      name: "Analytics",
      value: "analytics",
      icon: BarChart3,
    },
  ];

  // CREATE / UPDATE PROJECT
  const handleProjectSubmit = (e) => {
    e.preventDefault();

    if (editingProject) {
      setProjects(
        projects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                ...projectForm,
              }
            : project
        )
      );
    } else {
      const newProject = {
        id: Date.now(),
        ...projectForm,
        progress: 0,
        status: "Planning",
        members: 0,
      };

      setProjects([...projects, newProject]);
    }

    setProjectForm({
      title: "",
      category: "",
      description: "",
      deadline: "",
    });

    setEditingProject(null);
    setShowProjectModal(false);
  };

  // EDIT PROJECT
  const editProject = (project) => {
    setEditingProject(project);

    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description,
      deadline: project.deadline,
    });

    setShowProjectModal(true);
  };

  // DELETE PROJECT
  const deleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  // APPROVE APPLICATION
  const approveApplication = (id) => {
    setApplications(
      applications.map((application) =>
        application.id === id
          ? { ...application, status: "Approved" }
          : application
      )
    );
  };

  // REJECT APPLICATION
  const rejectApplication = (id) => {
    setApplications(
      applications.map((application) =>
        application.id === id
          ? { ...application, status: "Rejected" }
          : application
      )
    );
  };

  // CREATE TASK
  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      ...taskForm,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);

    setTaskForm({
      title: "",
      project: "",
      assignedTo: "",
      deadline: "",
    });

    setShowTaskModal(false);
  };

  // DELETE MEMBER
  const removeMember = (id) => {
    if (window.confirm("Remove this member?")) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  const statusStyle = (status) => {
    if (status === "Active" || status === "Approved" || status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 min-h-screen text-white fixed p-5">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold">
            P
          </div>

          <div>
            <h1 className="font-bold text-lg">Project Hub</h1>
            <p className="text-xs text-gray-400">Project Manager</p>
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

      {/* MAIN */}
      <main className="ml-64 flex-1">
        {/* HEADER */}
        <header className="h-20 bg-white border-b flex justify-between items-center px-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Project Manager Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Manage your projects and team.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell size={22} />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                PM
              </div>

              <div>
                <p className="font-semibold text-sm">Project Manager</p>
                <p className="text-xs text-gray-500">Manager</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Overview</h2>
                  <p className="text-gray-500 text-sm">
                    Your project performance at a glance.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProjectForm({
                      title: "",
                      category: "",
                      description: "",
                      deadline: "",
                    });
                    setShowProjectModal(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl"
                >
                  <Plus size={18} />
                  Create Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                  title="My Projects"
                  value={projects.length}
                  icon={<FolderKanban />}
                />

                <StatCard
                  title="Team Members"
                  value={members.length}
                  icon={<Users />}
                />

                <StatCard
                  title="Pending Applications"
                  value={
                    applications.filter(
                      (application) => application.status === "Pending"
                    ).length
                  }
                  icon={<Clock />}
                />

                <StatCard
                  title="Total Tasks"
                  value={tasks.length}
                  icon={<ClipboardList />}
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                <div className="bg-white border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">Recent Projects</h3>

                    <button
                      onClick={() => setActivePage("projects")}
                      className="text-sm text-indigo-600"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-5">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id}>
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-xs text-gray-500">
                              Deadline: {project.deadline}
                            </p>
                          </div>

                          <span className="text-sm font-semibold">
                            {project.progress}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">Pending Applications</h3>

                    <button
                      onClick={() => setActivePage("applications")}
                      className="text-sm text-indigo-600"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {applications
                      .filter((application) => application.status === "Pending")
                      .slice(0, 3)
                      .map((application) => (
                        <div
                          key={application.id}
                          className="flex justify-between items-center border-b pb-4"
                        >
                          <div>
                            <p className="font-medium">{application.name}</p>
                            <p className="text-xs text-gray-500">
                              {application.skill}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                approveApplication(application.id)
                              }
                              className="p-2 bg-green-100 text-green-600 rounded-lg"
                            >
                              <Check size={17} />
                            </button>

                            <button
                              onClick={() =>
                                rejectApplication(application.id)
                              }
                              className="p-2 bg-red-100 text-red-600 rounded-lg"
                            >
                              <X size={17} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PROJECTS */}
          {activePage === "projects" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Projects</h2>

                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProjectForm({
                      title: "",
                      category: "",
                      description: "",
                      deadline: "",
                    });
                    setShowProjectModal(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-xl"
                >
                  <Plus size={18} />
                  Create Project
                </button>
              </div>

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
                        className={`text-xs h-fit px-3 py-1 rounded-full ${statusStyle(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                      {project.description}
                    </p>

                    <div className="mt-5">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Project Progress</span>
                        <span>{project.progress}%</span>
                      </div>

                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-5">
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {project.members} Members
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {project.deadline}
                      </span>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => editProject(project)}
                        className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl"
                      >
                        <Edit size={17} />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProject(project.id)}
                        className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl"
                      >
                        <Trash2 size={17} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* APPLICATIONS */}
          {activePage === "applications" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Volunteer Applications
              </h2>

              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4">Applicant</th>
                        <th className="text-left px-6 py-4">Project</th>
                        <th className="text-left px-6 py-4">Skill</th>
                        <th className="text-left px-6 py-4">Status</th>
                        <th className="text-left px-6 py-4">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {applications.map((application) => (
                        <tr
                          key={application.id}
                          className="border-t"
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium">
                              {application.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {application.email}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            {application.project}
                          </td>

                          <td className="px-6 py-4">
                            {application.skill}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                                application.status
                              )}`}
                            >
                              {application.status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            {application.status === "Pending" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    approveApplication(application.id)
                                  }
                                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm"
                                >
                                  <Check size={16} />
                                  Approve
                                </button>

                                <button
                                  onClick={() =>
                                    rejectApplication(application.id)
                                  }
                                  className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm"
                                >
                                  <X size={16} />
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TASKS */}
          {activePage === "tasks" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Project Tasks
                </h2>

                <button
                  onClick={() => setShowTaskModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-xl"
                >
                  <Plus size={18} />
                  Assign Task
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">
                          {task.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {task.project}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <div className="mt-5 space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>Assigned:</strong>{" "}
                        {task.assignedTo}
                      </p>

                      <p>
                        <strong>Deadline:</strong>{" "}
                        {task.deadline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* MEMBERS */}
          {activePage === "members" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Project Members
              </h2>

              <div className="bg-white border rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-4">
                        Member
                      </th>

                      <th className="text-left px-6 py-4">
                        Project
                      </th>

                      <th className="text-left px-6 py-4">
                        Role
                      </th>

                      <th className="text-left px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {members.map((member) => (
                      <tr
                        key={member.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4 font-medium">
                          {member.name}
                        </td>

                        <td className="px-6 py-4">
                          {member.project}
                        </td>

                        <td className="px-6 py-4">
                          {member.role}
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              removeMember(member.id)
                            }
                            className="text-red-600 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ANALYTICS */}
          {activePage === "analytics" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Project Analytics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                  title="Total Projects"
                  value={projects.length}
                  icon={<FolderKanban />}
                />

                <StatCard
                  title="Average Progress"
                  value={`${Math.round(
                    projects.reduce(
                      (total, project) =>
                        total + project.progress,
                      0
                    ) / projects.length
                  )}%`}
                  icon={<BarChart3 />}
                />

                <StatCard
                  title="Completed Tasks"
                  value={
                    tasks.filter(
                      (task) =>
                        task.status === "Completed"
                    ).length
                  }
                  icon={<CheckCircle2 />}
                />

                <StatCard
                  title="Team Members"
                  value={members.length}
                  icon={<Users />}
                />
              </div>

              <div className="bg-white border rounded-2xl p-6 mt-8">
                <h3 className="font-bold text-lg mb-6">
                  Project Progress
                </h3>

                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">
                          {project.title}
                        </span>

                        <span className="text-sm">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleProjectSubmit}
            className="bg-white w-full max-w-lg rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingProject
                  ? "Edit Project"
                  : "Create New Project"}
              </h2>

              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="text-gray-500"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                required
                placeholder="Project Title"
                value={projectForm.title}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                required
                placeholder="Category"
                value={projectForm.category}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    category: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                required
                placeholder="Project Description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />

              <input
                type="date"
                required
                value={projectForm.deadline}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    deadline: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
            >
              {editingProject
                ? "Update Project"
                : "Create Project"}
            </button>
          </form>
        </div>
      )}

      {/* TASK MODAL */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleTaskSubmit}
            className="bg-white w-full max-w-lg rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Assign New Task
              </h2>

              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                className="text-gray-500"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                required
                placeholder="Task Title"
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <select
                required
                value={taskForm.project}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    project: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.title}
                  >
                    {project.title}
                  </option>
                ))}
              </select>

              <select
                required
                value={taskForm.assignedTo}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    assignedTo: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">
                  Assign To
                </option>

                {members.map((member) => (
                  <option
                    key={member.id}
                    value={member.name}
                  >
                    {member.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                required
                value={taskForm.deadline}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    deadline: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold"
            >
              Assign Task
            </button>
          </form>
        </div>
      )}
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

export default ManagerDashboard;

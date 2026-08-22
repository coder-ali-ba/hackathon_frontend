
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  CheckSquare,
  Bell,
  User,
  Search,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  MessageSquare,
  
} from "lucide-react";
import Logout from "../components/Logout";

function UserDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with React, Node.js and MongoDB.",
      category: "Web Development",
      location: "Remote",
      status: "Open",
      members: 4,
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "AI Chatbot",
      description:
        "An AI-powered chatbot for customer support and automation.",
      category: "Artificial Intelligence",
      location: "Islamabad",
      status: "Open",
      members: 3,
      skills: ["Python", "AI", "API"],
    },
    {
      id: 3,
      title: "Student Portal",
      description:
        "A complete student management and collaboration platform.",
      category: "Web Development",
      location: "Rawalpindi",
      status: "In Progress",
      members: 6,
      skills: ["React", "Express", "MongoDB"],
    },
    {
      id: 4,
      title: "Mobile Fitness App",
      description:
        "A mobile application for fitness tracking and health goals.",
      category: "Mobile Development",
      location: "Remote",
      status: "Open",
      members: 2,
      skills: ["React Native", "Firebase"],
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Create Login Page",
      project: "Student Portal",
      status: "In Progress",
      deadline: "25 Aug 2026",
    },
    {
      id: 2,
      title: "Design Dashboard UI",
      project: "E-Commerce Platform",
      status: "Completed",
      deadline: "23 Aug 2026",
    },
    {
      id: 3,
      title: "Connect API",
      project: "Student Portal",
      status: "To Do",
      deadline: "28 Aug 2026",
    },
  ];

  const notifications = [
    {
      id: 1,
      text: "Your application for AI Chatbot was approved.",
      time: "10 minutes ago",
    },
    {
      id: 2,
      text: "You have been assigned a new task.",
      time: "1 hour ago",
    },
    {
      id: 3,
      text: "Project Manager commented on Student Portal.",
      time: "3 hours ago",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    return (
      project.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || project.category === category) &&
      (location === "" || project.location === location) &&
      (status === "" || project.status === status)
    );
  });

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      value: "dashboard",
    },
    {
      name: "Browse Projects",
      icon: FolderKanban,
      value: "projects",
    },
    {
      name: "My Projects",
      icon: BriefcaseBusiness,
      value: "my-projects",
    },
    {
      name: "My Tasks",
      icon: CheckSquare,
      value: "tasks",
    },
    {
      name: "Profile",
      icon: User,
      value: "profile",
    },
  ];

  const changeTaskStatus = (id, newStatus) => {
    console.log("Task:", id, "New Status:", newStatus);
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-indigo-700 text-white p-5 fixed">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 bg-white text-indigo-700 rounded-xl flex items-center justify-center font-bold text-xl">
            P
          </div>

          <div>
            <h1 className="font-bold text-lg">Project Hub</h1>
            <p className="text-indigo-200 text-xs">User Dashboard</p>
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
                    ? "bg-white text-indigo-700"
                    : "hover:bg-indigo-600"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </div>

        <button className="absolute bottom-8 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition" >
          <Logout />
        </button>
      </aside>

      {/* MAIN */}
      <main className="ml-64 flex-1">
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white flex items-center justify-between px-8 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Welcome back, User 👋
            </h2>
            <p className="text-sm text-gray-500">
              Here's what's happening with your projects.
            </p>
          </div>

          <div className="flex items-center gap-5 relative">
            <button
              onClick={() =>
                setNotificationsOpen(!notificationsOpen)
              }
              className="relative"
            >
              <Bell size={23} className="text-gray-600" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute top-12 right-14 w-80 bg-white shadow-xl border rounded-2xl p-4 z-50">
                <h3 className="font-bold mb-3">Notifications</h3>

                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-b py-3 last:border-0"
                  >
                    <p className="text-sm text-gray-700">
                      {notification.text}
                    </p>

                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                U
              </div>

              <div>
                <p className="text-sm font-semibold">User Name</p>
                <p className="text-xs text-gray-500">User</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Dashboard Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                  title="Projects Joined"
                  value="3"
                  icon={<BriefcaseBusiness />}
                />

                <StatCard
                  title="Tasks Assigned"
                  value="12"
                  icon={<CheckSquare />}
                />

                <StatCard
                  title="Tasks Completed"
                  value="8"
                  icon={<CheckCircle2 />}
                />

                <StatCard
                  title="Completion Rate"
                  value="67%"
                  icon={<Clock />}
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl p-6 border">
                  <h3 className="font-bold text-lg mb-5">
                    Recent Projects
                  </h3>

                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <h4 className="font-semibold">
                            {project.title}
                          </h4>

                          <p className="text-sm text-gray-500">
                            {project.category}
                          </p>
                        </div>

                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border">
                  <h3 className="font-bold text-lg mb-5">
                    Upcoming Tasks
                  </h3>

                  <div className="space-y-4">
                    {tasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between border-b pb-4"
                      >
                        <div>
                          <h4 className="font-semibold">{task.title}</h4>

                          <p className="text-sm text-gray-500">
                            {task.project}
                          </p>
                        </div>

                        <span className="text-sm text-gray-500">
                          {task.deadline}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* BROWSE PROJECTS */}
          {activePage === "projects" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Browse Projects
              </h2>

              <div className="bg-white rounded-2xl p-5 border mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search
                      size={19}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full border rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-xl px-4 py-2.5"
                  >
                    <option value="">All Categories</option>
                    <option value="Web Development">
                      Web Development
                    </option>
                    <option value="Artificial Intelligence">
                      Artificial Intelligence
                    </option>
                    <option value="Mobile Development">
                      Mobile Development
                    </option>
                  </select>

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border rounded-xl px-4 py-2.5"
                  >
                    <option value="">All Locations</option>
                    <option value="Remote">Remote</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded-xl px-4 py-2.5"
                  >
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl p-6 border hover:shadow-lg transition"
                  >
                    <div className="flex justify-between gap-3">
                      <h3 className="font-bold text-lg">
                        {project.title}
                      </h3>

                      <span className="text-xs px-3 py-1 h-fit rounded-full bg-green-100 text-green-700">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                      <MapPin size={16} />
                      {project.location}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Users size={16} />
                      {project.members} Members
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        alert(
                          `Application submitted for ${project.title}`
                        )
                      }
                      className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition"
                    >
                      Apply to Join
                    </button>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  No projects found.
                </div>
              )}
            </>
          )}

          {/* MY PROJECTS */}
          {activePage === "my-projects" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                My Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl p-6 border"
                  >
                    <h3 className="font-bold text-lg">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {project.description}
                    </p>

                    <div className="flex gap-2 mt-5">
                      <button className="flex-1 bg-indigo-600 text-white py-2 rounded-xl">
                        View Project
                      </button>

                      <button className="w-12 border rounded-xl flex items-center justify-center">
                        <MessageSquare size={19} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TASKS */}
          {activePage === "tasks" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                My Tasks
              </h2>

              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4">
                          Task
                        </th>

                        <th className="text-left px-6 py-4">
                          Project
                        </th>

                        <th className="text-left px-6 py-4">
                          Deadline
                        </th>

                        <th className="text-left px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {tasks.map((task) => (
                        <tr
                          key={task.id}
                          className="border-t"
                        >
                          <td className="px-6 py-4 font-medium">
                            {task.title}
                          </td>

                          <td className="px-6 py-4 text-gray-500">
                            {task.project}
                          </td>

                          <td className="px-6 py-4 text-gray-500">
                            {task.deadline}
                          </td>

                          <td className="px-6 py-4">
                            <select
                              value={task.status}
                              onChange={(e) =>
                                changeTaskStatus(
                                  task.id,
                                  e.target.value
                                )
                              }
                              className="border rounded-lg px-3 py-2"
                            >
                              <option>To Do</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* PROFILE */}
          {activePage === "profile" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                My Profile
              </h2>

              <div className="max-w-3xl bg-white border rounded-2xl p-8">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl font-bold">
                    U
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      User Name
                    </h3>

                    <p className="text-gray-500">
                      user@example.com
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <ProfileField
                    label="Full Name"
                    value="User Name"
                  />

                  <ProfileField
                    label="Email"
                    value="user@example.com"
                  />

                  <ProfileField
                    label="Location"
                    value="Islamabad"
                  />

                  <ProfileField
                    label="Role"
                    value="User"
                  />
                </div>

                <div className="mt-6">
                  <p className="font-medium mb-3">Skills</p>

                  <div className="flex flex-wrap gap-2">
                    {["React", "JavaScript", "Node.js"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl">
                  Edit Profile
                </button>
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

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

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">
        {label}
      </p>

      <div className="border rounded-xl px-4 py-3">
        {value}
      </div>
    </div>
  );
}

export default UserDashboard;



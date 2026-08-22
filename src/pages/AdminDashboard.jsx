import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Search,
  LogOut,
} from "lucide-react";



import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  approveProject,
  rejectProject,
} from "../services/projectApis";
import DashboardStats from "../components/admin/DashboardStats";
import ProjectList from "../components/admin/ProjectList";
import ProjectForm from "../components/admin/ProjectForm";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [error, setError] = useState("");

  // GET PROJECTS
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects();

      setProjects(response.data || []);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch projects"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async (formData) => {
    try {
      setSaving(true);

      if (selectedProject) {
        await updateProject(
          selectedProject._id,
          formData
        );
      } else {
        await createProject(formData);
      }

      setShowForm(false);

      setSelectedProject(null);

      await fetchProjects();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // EDIT
  const handleEdit = (project) => {
    setSelectedProject(project);

    setShowForm(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      setProjects(
        projects.filter(
          (project) => project._id !== id
        )
      );

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete project"
      );
    }
  };

  // APPROVE
  const handleApprove = async (id) => {
    try {
      const response =
        await approveProject(id);

      setProjects(
        projects.map((project) =>
          project._id === id
            ? response.data
            : project
        )
      );

    } catch (error) {
      alert("Failed to approve project");
    }
  };

  // REJECT
  const handleReject = async (id) => {
    try {
      const response =
        await rejectProject(id);

      setProjects(
        projects.map((project) =>
          project._id === id
            ? response.data
            : project
        )
      );

    } catch (error) {
      alert("Failed to reject project");
    }
  };

  // SEARCH + FILTER
  const filteredProjects = projects.filter(
    (project) => {

      const matchesSearch =
        project.projectTitle
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        project.category
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <header className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="font-bold">
                Admin Dashboard
              </h1>

              <p className="text-xs text-gray-500">
                Project Management System
              </p>
            </div>

          </div>

          <button
            className="flex items-center gap-2 text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* WELCOME */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Dashboard Overview
          </h2>

          <p className="text-gray-500 mt-1">
            Manage and monitor all projects
          </p>

        </div>

        {/* STATS */}

        <DashboardStats
          projects={projects}
        />

        {/* PROJECT SECTION */}

        <div className="mt-10">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

            <div>

              <h2 className="text-xl font-bold">
                All Projects
              </h2>

              <p className="text-sm text-gray-500">
                Manage projects from one place
              </p>

            </div>

            <button
              onClick={() => {
                setSelectedProject(null);
                setShowForm(true);
              }}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
            >
              <Plus size={18} />
              Create Project
            </button>

          </div>

          {/* SEARCH + FILTER */}

          <div className="bg-white border rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border rounded-xl px-4 py-3 outline-none"
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

          {/* ERROR */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-5">
              {error}
            </div>
          )}

          {/* PROJECT LIST */}

          <ProjectList
            projects={filteredProjects}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onApprove={handleApprove}
            onReject={handleReject}
          />

        </div>

      </main>

      {/* CREATE / EDIT MODAL */}

      {showForm && (
        <ProjectForm
          selectedProject={selectedProject}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setSelectedProject(null);
          }}
          loading={saving}
        />
      )}

    </div>
  );
}

export default AdminDashboard;
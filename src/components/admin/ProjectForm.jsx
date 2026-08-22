import { useEffect, useState } from "react";

const initialState = {
  projectTitle: "",
  description: "",
  category: "",
  location: "",
  startDate: "",
  endDate: "",
  assignedTo: "",
  skillsRequired: "",
  
};

function ProjectForm({
  selectedProject,
  onSubmit,
  onClose,
  loading,
}) {
  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        projectTitle:
          selectedProject.projectTitle || "",

        description:
          selectedProject.description || "",

        category:
          selectedProject.category || "",

        location:
          selectedProject.location || "",

        startDate:
          selectedProject.startDate
            ? selectedProject.startDate.slice(0, 10)
            : "",

        endDate:
          selectedProject.endDate
            ? selectedProject.endDate.slice(0, 10)
            : "",

        assignedTo:
          selectedProject.assignedTo || "",

        skillsRequired:
          selectedProject.skillsRequired || "",

        
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedProject]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {selectedProject
              ? "Edit Project"
              : "Create Project"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={formData.projectTitle}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border p-3 rounded-xl"
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

          </div>

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills Required"
            value={formData.skillsRequired}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl disabled:bg-indigo-300"
            >
              {loading
                ? "Saving..."
                : selectedProject
                ? "Update Project"
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ProjectForm;
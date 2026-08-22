import {
  Pencil,
  Trash2,
  Check,
  X,
  MapPin,
  CalendarDays,
} from "lucide-react";

function ProjectCard({
  project,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}) {

  const getStatusStyle = () => {
    if (project.status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (project.status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">

      {project.projectImage && (
        <img
          src={project.projectImage}
          alt={project.projectTitle}
          className="w-full h-44 object-cover"
        />
      )}

      <div className="p-5">

        <div className="flex justify-between gap-3">

          <div>
            <h3 className="font-bold text-lg">
              {project.projectTitle}
            </h3>

            <p className="text-sm text-gray-500">
              {project.category}
            </p>
          </div>

          <span
            className={`h-fit px-3 py-1 text-xs rounded-full ${getStatusStyle()}`}
          >
            {project.status || "Pending"}
          </span>

        </div>

        <p className="text-gray-600 text-sm mt-4 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-gray-500">

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {project.location}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />

            {project.startDate?.slice(0, 10)}
            {" - "}
            {project.endDate?.slice(0, 10)}
          </div>

        </div>

        <div className="flex flex-wrap gap-2 mt-5">

          <button
            onClick={() => onEdit(project)}
            className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm"
          >
            <Pencil size={15} />
            Edit
          </button>

          <button
            onClick={() => onDelete(project._id)}
            className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm"
          >
            <Trash2 size={15} />
            Delete
          </button>

          <button
            onClick={() => onApprove(project._id)}
            className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg text-sm"
          >
            <Check size={15} />
            Approve
          </button>

          <button
            onClick={() => onReject(project._id)}
            className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-2 rounded-lg text-sm"
          >
            <X size={15} />
            Reject
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProjectCard;
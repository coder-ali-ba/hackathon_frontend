import ProjectCard from "./ProjectCard";

function ProjectList({
  projects,
  loading,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}) {

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading projects...
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No projects found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}

    </div>
  );
}

export default ProjectList;
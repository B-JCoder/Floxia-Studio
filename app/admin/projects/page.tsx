import { getProjects } from "./actions";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Track and manage your active client projects.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <ProjectsClient initialProjects={projects} />
      </div>
    </div>
  );
}

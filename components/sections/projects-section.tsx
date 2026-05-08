import { SectionHeader } from "@/components/shared/section-header";
import { EditorialProjectCard } from "./editorial-project-card";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Projects" />

        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <EditorialProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

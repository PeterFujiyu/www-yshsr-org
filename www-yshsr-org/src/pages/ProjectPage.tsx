import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGitHubRepo } from "@/hooks/use-github-repo";
import { projects, type Project } from "@/config/projects";
import { memo } from "react";

type ProjectCardProps = Project;

const ProjectCard = memo(function ProjectCard({ title, description, link }: ProjectCardProps) {
  const { t } = useTranslation();
  const { stars, loading, error } = useGitHubRepo(link);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center space-x-2">
          <Github className="h-4 w-4" />
          <span>{t('view_project')}</span>
          {loading && <span>...</span>}
          {error && <span className="text-red-500 text-sm">Error loading repo</span>}
          {stars !== null && (
            <span className="flex items-center space-x-1">
              <span>{t('star')}:</span>
              <span>{stars}</span>
            </span>
          )}
        </a>
      </CardContent>
    </Card>
  );
});

export function ProjectPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{t('my_projects')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
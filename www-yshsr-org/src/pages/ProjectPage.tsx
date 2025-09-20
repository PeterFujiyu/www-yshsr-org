import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react"; // Import Github icon
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

// Helper function to extract GitHub owner and repo from a URL
function getGithubRepoInfo(url: string): { owner: string; repo: string } | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "github.com") {
      const pathParts = urlObj.pathname.split('/').filter(part => part !== '');
      if (pathParts.length >= 2) {
        return { owner: pathParts[0], repo: pathParts[1] };
      }
    }
  } catch (error) {
    console.error("Invalid URL:", url);
  }
  return null;
}

function ProjectCard({ title, description, link }: ProjectCardProps) {
  const { t } = useTranslation();
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const repoInfo = getGithubRepoInfo(link);
    if (repoInfo) {
      const { owner, repo } = repoInfo;
      fetch(`https://api.github.com/repos/${owner}/${repo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setStars(data.stargazers_count);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [link]);

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
          {error && <span className="text-red-500">Error</span>}
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
}

export function ProjectPage() {
  const { t } = useTranslation();
  const projects = [
    {
      title: "Hsr Cloud Website",
      description: "A modern personal navigation website built with React, Vite, and Tailwind CSS.",
      link: "https://github.com/PeterFujiyu/www-yshsr-org",
    },
    {
      title: "Geektools",
      description: "A project to run shell script and download plugin with Rust.",
      link: "https://github.com/PeterFujiyu/geektools",
    },
    {
      title: "Geektools Plugin Marketplace",
      description: "A project to run a Geektools Plugin Marketplace Server with Rust.",
      link: "https://github.com/PeterFujiyu/pluginmarket",
    },
    {
      title: "More?",
      description: "Wait and see...",
      link: "https://github.com/PeterFujiyu/pluginmarket", // Example GitHub link
    },
  ];

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
import { useEffect, useState } from 'react';

interface GitHubRepoData {
  stargazers_count: number;
  name: string;
  description: string;
  html_url: string;
}

interface UseGitHubRepoResult {
  stars: number | null;
  loading: boolean;
  error: string | null;
  repoData: GitHubRepoData | null;
}

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
    // Silently handle invalid URLs in production
    if (process.env.NODE_ENV === 'development') {
      console.warn("Invalid GitHub URL:", url, error);
    }
  }
  return null;
}

export function useGitHubRepo(githubUrl: string): UseGitHubRepoResult {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repoData, setRepoData] = useState<GitHubRepoData | null>(null);

  useEffect(() => {
    const repoInfo = getGithubRepoInfo(githubUrl);

    if (!repoInfo) {
      setLoading(false);
      setError('Invalid GitHub URL');
      return;
    }

    const { owner, repo } = repoInfo;

    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: GitHubRepoData) => {
        setStars(data.stargazers_count);
        setRepoData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [githubUrl]);

  return {
    stars,
    loading,
    error,
    repoData
  };
}
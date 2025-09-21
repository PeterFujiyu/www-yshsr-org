// Common types used across the application

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export interface NavigationRoute {
  path: string;
  label: string;
  component: React.ComponentType;
}

export type Theme = 'light' | 'dark' | 'system';

export type Language = 'en_us' | 'zh_cn';

export interface SwipeDirection {
  direction: 'left' | 'right';
  distance: number;
}
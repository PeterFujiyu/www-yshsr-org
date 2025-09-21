export interface Project {
  title: string;
  description: string;
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Hsr Cloud Website",
    description: "A modern personal navigation website built with React, Vite, and Tailwind CSS.",
    link: "https://github.com/PeterFujiyu/www-yshsr-org",
    featured: true
  },
  {
    title: "Geektools",
    description: "A project to run shell script and download plugin with Rust.",
    link: "https://github.com/PeterFujiyu/geektools",
    featured: true
  },
  {
    title: "Geektools Plugin Marketplace",
    description: "A project to run a Geektools Plugin Marketplace Server with Rust.",
    link: "https://github.com/PeterFujiyu/pluginmarket",
    featured: true
  },
  {
    title: "More?",
    description: "Wait and see...",
    link: "https://github.com/PeterFujiyu"
  }
];
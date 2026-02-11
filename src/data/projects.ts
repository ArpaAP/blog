export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  year: string;
}

export const projects: Project[] = [
  {
    title: "Project Alpha",
    description: "A comprehensive dashboard for monitoring server health and performance metrics in real-time.",
    link: "https://github.com/example/project-alpha",
    tags: ["React", "TypeScript", "Node.js"],
    year: "2024"
  },
  {
    title: "Beta Commerce",
    description: "An e-commerce platform built with Next.js and Stripe, focusing on performance and SEO.",
    link: "https://github.com/example/beta-commerce",
    tags: ["Next.js", "Stripe", "Tailwind CSS"],
    year: "2023"
  },
  {
    title: "Gamma Chat",
    description: "A secure, end-to-end encrypted messaging application for teams.",
    link: "https://github.com/example/gamma-chat",
    tags: ["Vue.js", "Firebase", "WebRTC"],
    year: "2023"
  }
];

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  year: string;
}

export const projects: Project[] = [
  {
    title: "Aztra",
    description:
      "A comprehensive dashboard for monitoring server health and performance metrics in real-time.",
    link: "https://aztra.xyz",
    tags: ["React", "TypeScript", "Node.js"],
    year: "SINCE 2020",
  },
];

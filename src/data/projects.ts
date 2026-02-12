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
    description: "A beautiful Discord bot",
    link: "https://aztra.xyz",
    tags: ["React", "TypeScript", "Node.js"],
    year: "SINCE 2020",
  },
];

interface NavLink {
  name: string;
  href: string;
  newTab?: boolean;
}

export const links: NavLink[] = [
  { name: "소개", href: "/" },
  { name: "프로젝트", href: "/projects" },
  { name: "게시글", href: "/articles" },
  ...(process.env.NODE_ENV === "development"
    ? [{ name: "Keystatic", href: "/keystatic", newTab: true }]
    : []),
];

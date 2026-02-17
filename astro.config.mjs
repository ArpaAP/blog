import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/utils/reading-time.mjs";
import keystatic from "@keystatic/astro";

import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkReadingTime, remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    process.env.NODE_ENV === "development" ? keystatic() : null,
  ].filter(Boolean),
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: (element) => {
            // Add external link icon
            element.children.push({
              type: "element",
              tagName: "span",
              properties: {
                className: ["external-link-icon", "inline-block", "ml-0.5"],
              },
              children: [
                {
                  type: "element",
                  tagName: "svg",
                  properties: {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    class: "lucide lucide-external-link",
                  },
                  children: [
                    {
                      type: "element",
                      tagName: "path",
                      properties: {
                        d: "M15 3h6v6",
                      },
                      children: [],
                    },
                    {
                      type: "element",
                      tagName: "path",
                      properties: {
                        d: "M10 14 21 3",
                      },
                      children: [],
                    },
                    {
                      type: "element",
                      tagName: "path",
                      properties: {
                        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
                      },
                      children: [],
                    },
                  ],
                },
              ],
            });
            // Set target and rel
            element.properties.target = "_blank";
            element.properties.rel = ["noopener", "noreferrer"];
          },
        },
      ],
    ],
  },
});

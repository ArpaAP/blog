// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import { remarkReadingTime } from "./src/utils/reading-time.mjs";

// https://astro.build/config
import keystatic from "@keystatic/astro";

import react from "@astrojs/react";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
    process.env.NODE_ENV === "development" ? keystatic() : null,
  ].filter(Boolean),
});

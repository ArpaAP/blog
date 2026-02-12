// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import { remarkReadingTime } from "./src/utils/reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
  ],
});

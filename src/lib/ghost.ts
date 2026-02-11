import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
export const ghostClient = new GhostContentAPI({
  url: import.meta.env.API_URL || "https://demo.ghost.io",
  key: import.meta.env.CONTENT_API_KEY || "22444f78447824223cefc48062",
  version: "v5.0",
});

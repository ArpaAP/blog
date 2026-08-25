import type { CollectionEntry } from "astro:content";

/**
 * Extracts the URL slug from an article entry or its ID.
 * Returns only the filename portion without parent directory paths,
 * allowing nested directory organization while maintaining flat URLs (/articles/slug).
 */
export function getArticleSlug(post: CollectionEntry<"articles"> | string): string {
  const id = typeof post === "string" ? post : post.id;
  return id.split("/").pop() ?? id;
}

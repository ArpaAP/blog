import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us e.g. '1 min read'
    // readingTime.minutes will give us the number, e.g. 1
    // We attach it to the frontmatter so Astro creates it for us
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

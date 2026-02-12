import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "src/content/articles/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        published_at: fields.date({ label: "Published Date" }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        feature_image: fields.image({
          label: "Feature Image",
          directory: "public/images/articles",
          publicPath: "/images/articles/",
        }),
        feature_image_alt: fields.text({ label: "Feature Image Alt Text" }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
});

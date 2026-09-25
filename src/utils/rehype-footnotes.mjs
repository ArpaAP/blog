/**
 * Rehype plugin to transform Markdown footnotes section into an accessible,
 * styled collapsible <details> accordion with entire-line click navigation and unboxed numbers.
 */
export function rehypeFootnotes() {
  return (tree) => {
    function visit(node) {
      if (!node || !node.children) return;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (
          child.type === "element" &&
          child.tagName === "section" &&
          (child.properties?.dataFootnotes !== undefined ||
            (Array.isArray(child.properties?.className) &&
              child.properties.className.includes("footnotes")))
        ) {
          // Found footnotes section!
          let olNode = null;
          for (const c of child.children) {
            if (c.type === "element" && c.tagName === "ol") {
              olNode = c;
              break;
            }
          }

          const liItems =
            olNode?.children?.filter(
              (c) => c.type === "element" && c.tagName === "li"
            ) || [];
          const count = liItems.length;

          if (olNode) {
            olNode.properties = {
              ...olNode.properties,
              className: [
                "footnote-list",
                "space-y-1",
                "list-none",
                "p-0",
                "m-0",
              ],
            };

            let index = 0;
            for (const li of olNode.children) {
              if (li.type !== "element" || li.tagName !== "li") continue;

              const currentIndex = index++;
              let backrefHref = "";

              // Recursively search and remove the trailing backref button
              function removeBackref(parent) {
                if (!parent || !parent.children) return;
                for (let j = parent.children.length - 1; j >= 0; j--) {
                  const ch = parent.children[j];
                  if (
                    ch.type === "element" &&
                    ch.tagName === "a" &&
                    (ch.properties?.dataFootnoteBackref !== undefined ||
                      (ch.properties?.href &&
                        String(ch.properties.href).includes("fnref")))
                  ) {
                    backrefHref = ch.properties.href;
                    parent.children.splice(j, 1);
                  } else {
                    removeBackref(ch);
                  }
                }
              }

              removeBackref(li);

              // Fallback backref href if not found in children
              if (!backrefHref && li.properties?.id) {
                backrefHref =
                  "#" +
                  String(li.properties.id).replace(
                    "user-content-fn-",
                    "user-content-fnref-"
                  );
              }

              // Create number node: bold with brand color, NO box background, NO border
              const numNode = {
                type: "element",
                tagName: "span",
                properties: {
                  className: [
                    "footnote-num",
                    "font-bold",
                    "text-brand-600",
                    "dark:text-brand-400",
                    "mr-2",
                    "shrink-0",
                    "select-none",
                  ],
                },
                children: [{ type: "text", value: `${currentIndex + 1}.` }],
              };

              // Make paragraphs inside li inline and remove big typography margins
              if (li.children) {
                for (const c of li.children) {
                  if (c.type === "element" && c.tagName === "p") {
                    c.properties = {
                      ...c.properties,
                      className: ["inline", "m-0", "p-0"],
                    };
                  }
                }
              }

              const existingChildren = [...(li.children || [])];

              // Entire line is clickable to jump back
              li.properties = {
                ...li.properties,
                className: [
                  "footnote-item",
                  "group/fn",
                  "flex",
                  "items-baseline",
                  "py-1.5",
                  "px-2",
                  "rounded-lg",
                  "hover:bg-gray-100/80",
                  "dark:hover:bg-neutral-800/60",
                  "transition-colors",
                  "text-xs",
                  "text-slate-600",
                  "dark:text-neutral-300",
                  "leading-normal",
                  "cursor-pointer",
                ],
                dataFootnoteBackref: true,
                dataHref: backrefHref,
                tabIndex: 0,
                role: "link",
                title: "본문 위치로 이동",
                ariaLabel: `본문 ${currentIndex + 1}번 각주로 이동`,
              };

              li.children = [
                numNode,
                {
                  type: "element",
                  tagName: "span",
                  properties: {
                    className: [
                      "footnote-body",
                      "inline",
                      "flex-1",
                      "leading-relaxed",
                    ],
                  },
                  children: existingChildren,
                },
              ];
            }
          }

          // Replace section with styled container and details accordion
          node.children[i] = {
            type: "element",
            tagName: "section",
            properties: {
              className: [
                "footnotes",
                "not-prose",
                "mt-12",
                "pt-8",
                "border-t",
                "border-gray-200",
                "dark:border-neutral-800",
              ],
              dataFootnotes: true,
            },
            children: [
              {
                type: "element",
                tagName: "details",
                properties: {
                  id: "footnote-details",
                  className: [
                    "footnote-details",
                    "group",
                    "rounded-xl",
                    "border",
                    "border-gray-200/80",
                    "dark:border-neutral-800",
                    "bg-gray-50/50",
                    "dark:bg-neutral-900/50",
                    "transition-all",
                    "duration-200",
                  ],
                },
                children: [
                  {
                    type: "element",
                    tagName: "summary",
                    properties: {
                      className: [
                        "flex",
                        "items-center",
                        "justify-between",
                        "px-4",
                        "py-3.5",
                        "cursor-pointer",
                        "select-none",
                        "text-sm",
                        "font-semibold",
                        "text-slate-700",
                        "dark:text-slate-300",
                        "hover:text-brand-600",
                        "dark:hover:text-brand-400",
                        "list-none",
                        "rounded-xl",
                        "focus:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-brand-500",
                      ],
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: ["flex", "items-center", "gap-2"],
                        },
                        children: [
                          {
                            type: "element",
                            tagName: "svg",
                            properties: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "18",
                              height: "18",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              className: [
                                "text-brand-600",
                                "dark:text-brand-400",
                              ],
                            },
                            children: [
                              {
                                type: "element",
                                tagName: "path",
                                properties: {
                                  d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-.05",
                                },
                                children: [],
                              },
                              {
                                type: "element",
                                tagName: "path",
                                properties: {
                                  d: "M6 2v20",
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: "element",
                            tagName: "span",
                            properties: {},
                            children: [{ type: "text", value: "각주" }],
                          },
                          {
                            type: "element",
                            tagName: "span",
                            properties: {
                              className: [
                                "inline-flex",
                                "items-center",
                                "px-2",
                                "py-0.5",
                                "rounded-full",
                                "text-xs",
                                "font-medium",
                                "bg-brand-100",
                                "dark:bg-brand-950",
                                "text-brand-700",
                                "dark:text-brand-300",
                              ],
                            },
                            children: [
                              { type: "text", value: `${count}` },
                            ],
                          },
                        ],
                      },
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: [
                            "flex",
                            "items-center",
                            "gap-1.5",
                            "text-xs",
                            "text-slate-400",
                            "dark:text-neutral-500",
                          ],
                        },
                        children: [
                          {
                            type: "element",
                            tagName: "span",
                            properties: {
                              className: [
                                "footnote-toggle-hint",
                                "group-open:hidden",
                              ],
                            },
                            children: [{ type: "text", value: "펼치기" }],
                          },
                          {
                            type: "element",
                            tagName: "span",
                            properties: {
                              className: [
                                "footnote-toggle-hint-open",
                                "hidden",
                                "group-open:inline",
                              ],
                            },
                            children: [{ type: "text", value: "접기" }],
                          },
                          {
                            type: "element",
                            tagName: "svg",
                            properties: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              className: [
                                "footnote-chevron",
                                "transition-transform",
                                "duration-200",
                                "group-open:rotate-180",
                              ],
                            },
                            children: [
                              {
                                type: "element",
                                tagName: "path",
                                properties: {
                                  d: "m6 9 6 6 6-6",
                                },
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: [
                        "footnote-content",
                        "px-5",
                        "pb-5",
                        "pt-3",
                        "border-t",
                        "border-gray-200/60",
                        "dark:border-neutral-800/80",
                        "text-xs",
                        "text-slate-600",
                        "dark:text-neutral-300",
                      ],
                    },
                    children: olNode ? [olNode] : [],
                  },
                ],
              },
            ],
          };
          return;
        }

        visit(child);
      }
    }

    visit(tree);
  };
}

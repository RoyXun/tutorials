import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "懒人教程",
  titleTemplate: false,
  description: "个人自用学习教程，记录成长痕迹",
  head: [["link", { rel: "icon", href: "/tutorials/favicon.ico" }]],
  base: "/tutorials/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Tutorials",
        items: [
          {
            text: "JSON Schema",
            link: "/json-schema/",
            activeMatch: "/json-schema/",
          },
          { text: "Docker", link: "/docker/" },
        ],
      },
    ],

    // sidebar: [
    //   {
    //     text: "JSON Schema",
    //     items: [
    //       { text: "JSON Schema是什么", link: "/json-schema" },
    //       // { text: "docker", link: "/docker" },
    //       // { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    //   {
    //     text: "Docker",
    //     items: [{ text: "Docker是什么", link: "/docker" }],
    //   },
    // ],
    sidebar: {
      "/json-schema": [
        {
          text: "JSON Schema",
          items: [
            { text: "概览", link: "/json-schema/" },
            {
              text: "数据类型",
              link: "/json-schema/data-types",
              items: [
                {
                  text: "array",
                  link: "/json-schema/array",
                },
                {
                  text: "boolean",
                  link: "/json-schema/boolean",
                },
                {
                  text: "null",
                  link: "/json-schema/null",
                },
                {
                  text: "numeric types",
                  link: "/json-schema/numeric",
                },
                {
                  text: "object",
                  link: "/json-schema/object",
                },
                {
                  text: "regular expressions",
                  link: "/json-schema/regular-expressions",
                },
                {
                  text: "string",
                  link: "/json-schema/string",
                },
              ],
            },
            {
              text: "通用关键字",
              link: "/json-schema/general-keywords",
            },
            {
              text: "方言",
              link: "/json-schema/schema",
            },
            {
              text: "条件模式验证",
              link: "/json-schema/conditionals",
            },
            {
              text: "模式组合",
              link: "/json-schema/composition",
            },
            {
              text: "Media:字符串编码非JSON数据",
              link: "/json-schema/non-json-data",
            },
          ],
        },
      ],
      "/docker": [
        {
          text: "Docker",
          items: [{ text: "Docker是什么", link: "/docker/" }],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/RoyXun/tutorials",
      },
    ],
    outline: {
      level: "deep",
      label: "页面导航",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },
});

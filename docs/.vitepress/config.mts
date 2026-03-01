import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "懒人教程",
  titleTemplate: false,
  description: "记录学习过程中的一些笔记",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  base: "/tutorials/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: "Home", link: "/" },
      { text: "教程", link: "/json-schema" },
    ],

    sidebar: [
      {
        text: "教程",
        items: [
          { text: "JSON Schema入门", link: "/json-schema" },
          // { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    outline: "deep",
  },
});

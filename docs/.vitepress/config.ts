import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "懒人教程",
  titleTemplate: false,
  description: "个人自用学习教程，记录成长痕迹",
  head: [["link", { rel: "icon", href: "/tutorials/favicon.ico" }]],
  base: "/tutorials/",
  themeConfig: {
    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
      },
    },
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
          {
            text: "YAML",
            link: "/yaml",
          },
          {
            text: "TOML",
            link: "/toml",
          },
          {
            text: "JWT",
            link: "/jwt",
          },
          {
            text: "MongoDB(WIP)",
            link: "/mongodb/",
            activeMatch: "/mongodb/",
          },
          // {
          //   text: "OpenAPI",
          //   link: "/openapi",
          // },
          // { text: "Docker(WIP)", link: "/docker/" },
          // { text: "Design Patterns", link: "/design-patterns/" },
        ],
      },
      {
        text: "Blog",
        link: "https://royxun.github.io/blog/",
      },
    ],

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
      "/mongodb": [
        {
          text: "MongoDB",
          items: [
            { text: "简介", link: "/mongodb/" },
            { text: "安装", link: "/mongodb/installation" },
            { text: "连接", link: "/mongodb/connection" },
            { text: "文档", link: "/mongodb/document" },
            { text: "集合", link: "/mongodb/collection" },
            { text: "数据库", link: "/mongodb/database" },
            { text: "用户", link: "/mongodb/user" },
            { text: "角色", link: "/mongodb/role" },
            { text: "权限", link: "/mongodb/privilege" },
            // { text: "数据模型", link: "/mongodb/data-model" },
            // { text: "CRUD", link: "/mongodb/crud" },
            // { text: "索引", link: "/mongodb/index" },
            // { text: "聚合", link: "/mongodb/aggregation" },
            // { text: "复制集", link: "/mongodb/replica-set" },
            // { text: "分片集群", link: "/mongodb/sharded-cluster" },
          ],
        },
      ],
      "/docker": [
        {
          text: "Docker",
          items: [
            { text: "简介", link: "/docker/" },
            { text: "安装", link: "/docker/installation" },
            { text: "镜像", link: "/docker/image" },
            { text: "容器", link: "/docker/container" },
            { text: "网络", link: "/docker/network" },
            { text: "镜像仓库", link: "/docker/registry" },
            {
              text: "存储",
              link: "/docker/storage",
              items: [
                {
                  text: "卷",
                  link: "/docker/volume",
                },
                {
                  text: "绑定挂载",
                  link: "/docker/bind",
                },
                {
                  text: "tmpfs",
                  link: "/docker/tmpfs",
                },
              ],
            },
            { text: "Dockerfile", link: "/docker/dockerfile" },
            { text: "Compose File", link: "/docker/compose-file" },
            // { text: "安装", link: "/docker/installation" },
          ],
        },
      ],
      "/design-patterns": [
        {
          text: "设计模式",
          items: [
            { text: "简介", link: "/design-patterns/" },
            {
              text: "创建型模式",
              collapsed: true,
              items: [
                {
                  text: "抽象工厂模式",
                  link: "/design-patterns/abstract-factory",
                },
                // { text: "建造者模式", link: "/design-patterns/builder" },
                {
                  text: "工厂方法模式",
                  link: "/design-patterns/factory-method",
                },
                // { text: "原型模式", link: "/design-patterns/prototype" },
                // { text: "单例模式", link: "/design-patterns/singleton" },
              ],
            },
            // {
            //   text: "结构型模式",
            //   collapsed: true,
            //   items: [
            //     { text: "适配器模式", link: "/design-patterns/adapter" },
            //     { text: "桥接模式", link: "/design-patterns/bridge" },
            //     { text: "组合模式", link: "/design-patterns/composite" },
            //     { text: "装饰器模式", link: "/design-patterns/decorator" },
            //     { text: "外观模式", link: "/design-patterns/facade" },
            //     { text: "享元模式", link: "/design-patterns/flyweight" },
            //     { text: "代理模式", link: "/design-patterns/proxy" },
            //   ],
            // },
            {
              text: "行为型模式",
              collapsed: true,
              items: [
                { text: "中介者模式", link: "/design-patterns/mediator" },
                { text: "观察者模式", link: "/design-patterns/observer" },
                // {
                //   text: "责任链模式",
                //   link: "/design-patterns/chain-of-responsibility",
                // },
                // { text: "命令模式", link: "/design-patterns/command" },
                // { text: "解释器模式", link: "/design-patterns/interpreter" },
                // { text: "迭代器模式", link: "/design-patterns/iterator" },
                // { text: "备忘录模式", link: "/design-patterns/memento" },
                // { text: "状态模式", link: "/design-patterns/state" },
                { text: "策略模式", link: "/design-patterns/strategy" },
                // {
                //   text: "模板方法模式",
                //   link: "/design-patterns/template-method",
                // },
                // { text: "访问者模式", link: "/design-patterns visitor" },
              ],
            },
            // { text: "单例模式", link: "/design-patterns/singleton" },
            // { text: "工厂模式", link: "/design-patterns/factory" },
            // { text: "抽象工厂模式", link: "/design-patterns/abstract-factory" },
            // { text: "建造者模式", link: "/design-patterns/builder" },
            // { text: "原型模式", link: "/design-patterns/prototype" },
            // { text: "适配器模式", link: "/design-patterns/adapter" },
            // { text: "桥接模式", link: "/design-patterns/bridge" },
            // { text: "组合模式", link: "/design-patterns/composite" },
            // { text: "装饰器模式", link: "/design-patterns/decorator" },
            // { text: "外观模式", link: "/design-patterns/facade" },
            // { text: "享元模式", link: "/design-patterns/flyweight" },
            // { text: "代理模式", link: "/design-patterns/proxy" },
          ],
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

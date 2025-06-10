import { createContentLoader, defineConfig, HeadConfig } from "vitepress";
import { fileURLToPath } from "url";
import { SitemapStream } from "sitemap";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { withMermaid } from "vitepress-plugin-mermaid";
import { type DefaultTheme } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

export default withMermaid({
  //   vite: {
  //     plugins: [
  //       GitChangelog({
  //         // Fill in your repository URL here
  //         repoURL: () => 'https://github.com/aSumo-1xts/aSumoranda',
  //       }),
  //       GitChangelogMarkdownSection(),
  //     ],
  //   },

  lang: "ja",
  base: "/",
  title: "aSumoranda",
  description: "ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ",

  markdown: {
    math: true,
    lineNumbers: true,
    image: {
      lazyLoading: false,
    },
    config: (md) => {
      md.use(tabsMarkdownPlugin);
    },
  },

  themeConfig: {
    logo: "./home.webp",
    siteTitle: false,

    outlineTitle: "目次",

    nav: [
      { text: "すべての記事", link: "/posts" },
      { text: "すべてのタグ", link: "/tags" },
      { text: "各種ご案内", link: "/info" },
      {
        text: "1x telescope",
        link: "https://1xtelescope.com",
        target: "_blank",
        rel: "sponsored",
      },
    ],

    sidebar: {
      "/": { base: "", items: mySidebar() },
    },

    socialLinks: [
      { icon: "discord", link: "https://discord.gg/DPArTErbtv" },
      { icon: "twitter", link: "https://x.com/asumo_1xts" },
      { icon: "github", link: "https://github.com/aSumo-1xts" },
    ],

    footer: {
      message: "Some rights reserved.",
      copyright: "ｱｽﾓ 2024-2025 | CC BY-SA 4.0",
    },

    editLink: {
      pattern: "https://github.com/aSumo-1xts/aSumoranda/blob/main/docs/:path",
      text: "GitHubで編集を提案",
    },

    lastUpdated: {
      text: "最終更新日",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },

    search: {
      provider: "local",
    },
  },

  appearance: "force-dark", // ダークモードのみ

  // サイトマップの生成
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: "https://blog.1xtelescope.com",
    });
    const pages = await createContentLoader("**/*.md").load();
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));

    sitemap.pipe(writeStream);

    pages.forEach((page) => sitemap.write(page.frontmatter.permalink));
    sitemap.end();

    await new Promise((r) => writeStream.on("finish", r));
  },

  // メタタグの設定
  // ページごとに設定したいものは、ここに書かないこと！（なぜかオーバーライドされない）
  head: [
    ["link", { rel: "icon", href: "./favicon.ico" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://blog.1xtelescope.com/cover01.png",
      },
    ],
    ["meta", { property: "og:locale", content: "ja_JP" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "aSumoranda" }],
    ["meta", { property: "twitter:card", content: "summary" }],
    ["meta", { property: "twitter:site", content: "@asumo_1xts" }],
  ],

  transformHead({ assets, pageData }) {
    const head: HeadConfig[] = [];

    // フォントのプリロード
    const FontFile = assets.find(
      (file) =>
        /(NotoSansJP-VariableFont_wght|ZenKakuGothicNew-Regular|MoralerspaceNeonHW-Regular)\.\w+\.woff2$/,
    );
    if (FontFile) {
      head.push([
        "link",
        {
          rel: "preload",
          href: FontFile,
          as: "font",
          type: "font/woff2",
        },
      ]);
    }

    // 動的なメタタグの設定
    const title = pageData.frontmatter.title || "aSumoranda";
    const description =
      pageData.frontmatter.description || "ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ";
    const url =
      pageData.frontmatter.permalink || "https://blog.1xtelescope.com/";
    const author = pageData.frontmatter.author || "aSumo";
    head.push(["meta", { property: "og:title", content: title }]);
    head.push(["meta", { property: "og:description", content: description }]);
    head.push(["meta", { property: "og:url", content: url }]);
    head.push(["meta", { property: "og:author", content: author }]);

    // まとめて返す
    return head;
  },

  // mermaidの設定
  mermaid: { theme: "forest" },
  mermaidPlugin: { class: "mermaid my-class" },
});

function mySidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "主な記事",
      base: "/posts/",
      collapsed: false,
      items: generateSidebar({
        // itemsにエラーが出ても無視
        documentRootPath: "docs",
        scanStartPath: "posts",
        useTitleFromFrontmatter: true,
        sortMenusByFrontmatterDate: true,
        excludeFilesByFrontmatterFieldName: "hidden",
      }),
    },
    {
      text: "主なタグ",
      base: "/tags/",
      collapsed: false,
      items: generateSidebar({
        // itemsにエラーが出ても無視
        documentRootPath: "docs",
        scanStartPath: "tags",
        useTitleFromFrontmatter: true,
        sortMenusByFrontmatterOrder: true,
        excludeFilesByFrontmatterFieldName: "hidden",
      }),
    },
  ];
}

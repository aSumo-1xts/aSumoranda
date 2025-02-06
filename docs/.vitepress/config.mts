import { createContentLoader, defineConfig, HeadConfig } from 'vitepress'
import { SitemapStream } from 'sitemap'
import { createWriteStream} from 'node:fs'
import { resolve } from 'node:path'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { type DefaultTheme } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';



export default defineConfig({
//   vite: { 
//     plugins: [ 
//       GitChangelog({ 
//         // Fill in your repository URL here
//         repoURL: () => 'https://github.com/aSumo-1xts/aSumoranda', 
//       }), 
//       GitChangelogMarkdownSection(), 
//     ],
//   },

  lang: 'ja',
  base: '/aSumoranda/',
  title: "aSumoranda",
  description: "ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ",

  markdown: {
    math: true,
    lineNumbers: true,
    image: {
      lazyLoading: false
    },
    config: (md) => {
      md.use(tabsMarkdownPlugin)
    }
  },

  themeConfig: {
    logo: "./home.png",
    siteTitle: "aSumoranda",

    outlineTitle: "目次",

    nav: [
      { text: 'すべての記事', link: '/posts/' },
      { text: 'すべてのタグ', link: '/tags/' },
      { text: 'About', link: '/about' },
      { text: 'Contact', link: '/contact' },
      { 
        text: '1x telescope',
        link: 'https://sites.google.com/view/1xtelescope',
        target: '_blank',
        rel: 'sponsored'
      }
    ],

    sidebar: {
      '/': { base: '', items: mySidebar() },
    },

    socialLinks: [
      { icon: 'discord',  link: 'https://discord.gg/DPArTErbtv' },
      { icon: 'twitter',  link: 'https://x.com/asumo_1xts' },
      { icon: 'youtube',  link: 'https://www.youtube.com/@1xtelescope' },
      { icon: 'github',   link: 'https://github.com/aSumo-1xts' },
    ],

    footer: {
      message:    'Some rights reserved.',
      copyright:  'ｱｽﾓ 2024 | CC BY-SA 4.0',
    },

    editLink: {
      pattern:  'https://github.com/aSumo-1xts/aSumoranda/blob/main/docs/:path',
      text:     'GitHubで編集を提案',
    },

    lastUpdated: {
      text: '最終更新日',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      }
    }

  },

  appearance: "force-dark", // ダークモードのみ

  buildEnd: async ({ outDir }) => {
    const sitemap     = new SitemapStream({ hostname: 'https://aSumo-1xts.github.io' })
    const pages       = await createContentLoader('**/*.md').load()
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))

    sitemap.pipe(writeStream)

    pages.forEach((page) => sitemap.write(
      page.frontmatter.permalink
    ))
    sitemap.end()

    await new Promise((r) => writeStream.on('finish', r))
  },

  // メタタグの設定
  // ページごとに設定したいものは、ここに書かないこと！（なぜかオーバーライドされない）
  head: [
    ["link", { rel: "icon", href: "./favicon.ico" }],
    ["meta", { property: "og:image",      content: "https://github.com/aSumo-1xts/aSumoranda/blob/main/docs/public/cover02.png?raw=true" }],
    ["meta", { property: "og:locale",     content: "ja_JP" }],
    ["meta", { property: "og:type",       content: "website" }],
    ["meta", { property: "og:site_name",  content: "aSumoranda" }],
    ["meta", { property: "twitter:card",  content: "summary" }],
    ["meta", { property: "twitter:site",  content: "@asumo_1xts" }],
    ["meta", { name: "google-site-verification", content: "Z4mBgVmyKVbtfym9T-qtX7jgGnNYrzWGiBkcP7vyXt0" }],
  ],



  transformHead({ assets, pageData }) {
    const head: HeadConfig[] = []

    // フォントのプリロード
    const FontFile = assets.find(file => /(NotoSansJP-VariableFont_wght|ZenKakuGothicNew-Regular|MoralerspaceNeonHW-Regular)\.\w+\.woff2$/);
    if (FontFile) {
      head.push (
        [
          'link',
          {
            rel:  'preload',
            href: FontFile,
            as:   'font',
            type: 'font/woff2',
          }
        ]
      );
    }

    // 動的なメタタグの設定
    const title       = pageData.frontmatter.title || 'aSumoranda';
    const description = pageData.frontmatter.description || 'ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ';
    const url         = pageData.frontmatter.permalink || 'https://aSumo-1xts.github.io/aSumoranda/';
    const author      = pageData.frontmatter.author || 'aSumo';
    head.push(['meta', { property: 'og:title',        content: title }]);
    head.push(['meta', { property: 'og:description',  content: description }]);
    head.push(['meta', { property: 'og:url',          content: url }]);
    head.push(['meta', { property: 'og:author',       content: author }]);
    
    // まとめて返す
    return head;
  },
  
})



function mySidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '主な記事',
      base:'/posts/',
      collapsed: false,
      items: generateSidebar({  // itemsにエラーが出ても無視
        documentRootPath:           'docs',
        scanStartPath:              'posts',
        useTitleFromFrontmatter:      true,
        sortMenusByFrontmatterDate:   true,
        sortMenusOrderByDescending:   true,
        excludeFilesByFrontmatterFieldName: "hidden",
      })
    },
    {
      text: '主なタグ',
      base:'/tags/',
      collapsed: false,
      items: generateSidebar({  // itemsにエラーが出ても無視
        documentRootPath:           'docs',
        scanStartPath:              'tags',
        useTitleFromFrontmatter:      true,
        sortMenusByFrontmatterOrder:  true,
        excludeFilesByFrontmatterFieldName: "hidden",
      })
    },
  ]
}
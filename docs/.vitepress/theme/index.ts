import DefaultTheme from "vitepress/theme-without-fonts";
import type { Theme as ThemeConfig } from "vitepress";
import { useData, useRoute } from "vitepress";
import googleAnalytics from "vitepress-plugin-google-analytics";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import codeblocksFold from 'vitepress-plugin-codeblocks-fold';
import "./style.css";
import "viewerjs/dist/viewer.min.css";
import 'vitepress-plugin-codeblocks-fold/style/index.css';
import 'virtual:group-icons.css'


const Theme: ThemeConfig = {
  extends: DefaultTheme,
};

export default {
  ...Theme,
  enhanceApp: (ctx) => {
    googleAnalytics({
      id: "G-2B1RQXT1NM",
    });
    ctx.app.component("vImageViewer", vImageViewer);
  },
  setup() {
    const route = useRoute();
    const { frontmatter } = useData();
    imageViewer(route);
    codeblocksFold({ route, frontmatter }, true);
  },
};

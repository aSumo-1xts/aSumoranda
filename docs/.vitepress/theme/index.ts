import DefaultTheme from "vitepress/theme-without-fonts";
import type { Theme as ThemeConfig } from "vitepress";
import { useData, useRoute } from "vitepress";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import { ImageGroup } from "@miletorix/vitepress-image-group";
import imageViewer from "vitepress-plugin-image-viewer";
import codeblocksFold from "vitepress-plugin-codeblocks-fold";
import "./style.css";
import "viewerjs/dist/viewer.min.css";
import "vitepress-plugin-codeblocks-fold/style/index.css";
import "virtual:group-icons.css";
import "@miletorix/vitepress-image-group/style.css";

const Theme: ThemeConfig = {
  extends: DefaultTheme,
};

export default {
  ...Theme,
  enhanceApp: (ctx) => {
    ctx.app.component("vImageViewer", vImageViewer);
    ctx.app.component("ImageGroup", ImageGroup);
  },
  setup() {
    const route = useRoute();
    const { frontmatter } = useData();
    imageViewer(route);
    codeblocksFold({ route, frontmatter }, true);
  },
};

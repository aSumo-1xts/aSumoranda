import DefaultTheme from "vitepress/theme-without-fonts";
import type { Theme as ThemeConfig } from "vitepress";
import "./style.css";
import googleAnalytics from "vitepress-plugin-google-analytics";
import "viewerjs/dist/viewer.min.css";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import { useRoute } from "vitepress";

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
    const route = useRoute(); // Get route
    imageViewer(route); // Using
  },
};

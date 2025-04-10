import DefaultTheme from "vitepress/theme-without-fonts";
import type { Theme as ThemeConfig } from "vitepress";
import "./style.css";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import googleAnalytics from "vitepress-plugin-google-analytics";
import "viewerjs/dist/viewer.min.css";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import { useRoute } from "vitepress";

const Theme: ThemeConfig = {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
    app.use(NolebaseGitChangelogPlugin);
  },
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
    // Get route
    const route = useRoute();
    // Using
    imageViewer(route);
  },
};

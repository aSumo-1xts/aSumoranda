import DefaultTheme from "vitepress/theme-without-fonts";
import type { Theme as ThemeConfig } from "vitepress";
import "./style.css";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";

import "@nolebase/vitepress-plugin-git-changelog/client/style.css";

import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";

import googleAnalytics from "vitepress-plugin-google-analytics";

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
  },
};

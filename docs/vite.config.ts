import { defineConfig } from "vite";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";

export default defineConfig(() => {
  return {
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
        "@nolebase/ui",
      ],
    },
    ssr: {
      noExternal: [
        // If there are other packages that need to be processed by Vite, you can add them here.
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/ui",
      ],
    },
    plugins: [
      GitChangelog({
        repoURL: () => "https://github.com/nolebase/integrations",
        mapAuthors: [
          {
            name: "aSumo",
            username: "aSumo-1xts",
            mapByEmailAliases: ["1xtelescope@gmail.com"],
          },
        ],
      }),
      GitChangelogMarkdownSection({
        sections: {
          disableChangelog: true,
          disableContributors: true,
        },
      }),
    ],
  };
});

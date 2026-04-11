import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import ImageViewerPlugin from "@miletorix/vitepress-image-viewer";
import "@miletorix/vitepress-image-viewer/style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    ImageViewerPlugin(app);
  },
} satisfies Theme;

import { defineConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "react-otpify",
      fileName: (format) => `react-otpify.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});

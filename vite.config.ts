import { defineConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  server: {
    port: 3000,
    open: "/docs/index.html",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "ReactOtpify",
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
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "docs",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: path.resolve(__dirname, "dist-docs"),
    emptyOutDir: true,
  },
});

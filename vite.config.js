import { defineConfig } from "vite";
import compressionPlugin from "vite-plugin-compression2";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    compressionPlugin({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
      verbose: true,
    }),
  ],
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  preview: {
    port: 3001,
  },
  server: {
    port: 3000,
  },
});

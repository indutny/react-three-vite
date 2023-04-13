import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import react from "@vitejs/plugin-react";

// This is required for Vite to work correctly with CodeSandbox
const server = process.env.APP_ENV === "sandbox" ? { hmr: { clientPort: 443 } } : {};

// https://vitejs.dev/config/
export default defineConfig({
  server: server,
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        app: './src/App.jsx',
      },
    },
  },
});

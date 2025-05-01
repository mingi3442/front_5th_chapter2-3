import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter2-2/" : "",
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

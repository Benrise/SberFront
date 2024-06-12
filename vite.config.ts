import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path'
import { packageDirectorySync } from 'pkg-dir'
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import Icons from 'unplugin-icons/vite';

const packageRoot = packageDirectorySync()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Icons({ compiler: 'jsx', jsx: 'react' })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/app/styles/variables.scss"; 
          @import "@/app/styles/mixins.scss";
        `
      }
    }
  },
})

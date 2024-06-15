import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path'
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import Icons from 'unplugin-icons/vite';

const env = loadEnv('', process.cwd(), '')

const apiUrl = env?.VITE_APP_API_BASE_URL;
const apiProtocol = env?.VITE_APP_API_PROTOCOL;
const apiService = env?.VITE_APP_API_HOST;
const apiPort = env?.VITE_APP_API_SERVICE_PORT;

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
  logLevel: 'info',
  server: {
    proxy: {
      [apiUrl]: {
        target: `${apiProtocol}://${apiService}:${apiPort}/${apiUrl}`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
    port: 8080
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

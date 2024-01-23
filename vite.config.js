import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueImages from 'vite-plugin-vue-images';
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  plugins: [vue(),VueImages()],
  resolve: { 
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})

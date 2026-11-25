import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' — пути в dist/ относительные, сайт работает и в корне домена,
// и в подпапке (GitHub Pages: /имя-репозитория/).
export default defineConfig({
  base: './',
  plugins: [react()],
})

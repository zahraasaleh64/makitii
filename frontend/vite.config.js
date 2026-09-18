import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
//
// En développement (`npm run dev`), le frontend tourne sur son propre port
// (5173) et appelle l'API Laravel via VITE_API_BASE_URL.
//
// En production (`npm run build`), le résultat est compilé directement dans
// backend/public/build. Laravel sert alors ce dossier ET l'API depuis la
// même application : un seul serveur, une seule URL, plus de CORS.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/build/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../backend/public/build',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'https://midcurve.otherstuff.ai',
    hmr: {
      protocol: 'wss',
      host: 'midcurve.otherstuff.ai',
      port: 443,
    },
  },
})

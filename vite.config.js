import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'midcurve.otherstuff.ai',
      'dev.otherstuff.studio',
      'localhost',
      '127.0.0.1',
      '.otherstuff.ai',
      '.otherstuff.studio',
      '.wmhost.app',
    ],
  },
})

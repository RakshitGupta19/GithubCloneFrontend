import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to external network (Render)
    port: process.env.PORT || 5173, // Use Render-assigned port if available
  },
})

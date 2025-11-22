import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite configuration — single default export
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      'lucide-react': path.resolve(__dirname, 'src/lucide-react.tsx')
    }
  }
})

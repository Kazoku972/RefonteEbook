import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/RefonteEbook/modern-test-paysage-v1/',
  build: {
    outDir: '../../docs/modern-test-paysage-v1',
    emptyOutDir: true,
  }
})

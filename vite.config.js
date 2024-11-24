import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@images': '/src/assets/img',
      '@layout': '/src/layout',
      '@styles': '/src/styles',
      '@api': '/src/api',
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [
    react({
      jsxRuntime: 'automatic', 
      babel: { plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]] },
    }),
  ],
  build: {
    sourcemap: true, 
  },
})

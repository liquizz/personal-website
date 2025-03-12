import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/personal-website/',
  
  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
    }
  },
  
  esbuild: {
    jsxInject: `import React from 'react'`, // This automatically injects React into JSX files
  }
})

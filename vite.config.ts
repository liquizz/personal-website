import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
    }
  },
  
  esbuild: {
    jsxInject: `import React from 'react'`,
  }
});

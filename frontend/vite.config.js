import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173, // Default port, can change if needed
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // My backend server
        changeOrigin: true,
      }
    },
  },
});
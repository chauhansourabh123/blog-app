import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine the API URL based on the environment
const API_URL = import.meta.env.VITE_API_URL || '/api';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4002',
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env': {
      API_URL,
    },
  },
});

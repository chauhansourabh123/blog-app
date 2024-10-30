import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine the API URL based on the environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://blog-app-5pv4.onrender.com/api/v1' 
  : '/api';

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

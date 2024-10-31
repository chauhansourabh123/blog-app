import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set a default value if the variable is not defined
const API_URL = process.env.VITE_API_URL || '/api';

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

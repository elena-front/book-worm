import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/books': 'http://localhost:3000',
      '/reviews': 'http://localhost:3000',
      '/favorites': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      "/uploads": "http://localhost:3000"
    },
  },
});

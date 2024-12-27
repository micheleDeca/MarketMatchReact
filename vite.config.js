import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specifica la porta
    host: true, // Rende il server accessibile da altri dispositivi
    proxy: {
      '/api': { // Sostituisci con il prefisso che usi per le chiamate al backend
        target: 'http://localhost:1337', // URL del tuo server Strapi
        changeOrigin: true, // Cambia l'origine per evitare problemi di CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Rimuovi il prefisso /api, se necessario
      },
    },
  },
});

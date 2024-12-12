import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  https: {
    key: './private.key', // Rende il server accessibile da tutte le interfacce
    cert: './marketmatch.crt',      // Specifica la porta 5173
  },
});

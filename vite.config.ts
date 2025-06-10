// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),],
  
  
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,            // enables describe/it/expect globally
    environment: 'jsdom',     // required for testing React components
    setupFiles: [],           // optional: setup files if needed
    exclude: [...configDefaults.exclude], // keeps default excludes
  },
});

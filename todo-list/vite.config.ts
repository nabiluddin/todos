import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    devtools({
      autoname: true,
    }), solidPlugin()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es',
        globals: {
          solid: 'Solid',
          'solid-js': 'SolidJS',
        },
        manualChunks(id) {
          if (/projectEnvVariables.ts/.test(id)) {
            return 'projectEnvVariables'
          }
        }
      }
    }
  }
});

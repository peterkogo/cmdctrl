import { defineConfig } from 'vite';
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      name: 'shortcuts',
    },
  },
});
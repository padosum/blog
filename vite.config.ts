import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ command }) => {
  // `vite` (dev server): dist/ 를 그대로 정적 서빙
  if (command === 'serve') {
    return {
      root: resolve(__dirname, 'dist'),
      server: { port: 5173 },
    };
  }

  // `vite build`: 클라이언트 JS 번들 → dist/_assets/
  return {
    publicDir: resolve(__dirname, 'src/public'),
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: false,
      manifest: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/client/main.ts'),
        },
        output: {
          entryFileNames: '_assets/[name].js',
          chunkFileNames: '_assets/[name].js',
          assetFileNames: '_assets/[name][extname]',
        },
      },
    },
  };
});

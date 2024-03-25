import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    test: {
      globals: true,
      setupFiles: 'src/setupTests.ts',
      includeSource: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src', 'TpComponents'),
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/TpComponents/index.ts'),
        name: 'TpComponents',
        fileName: 'tp-components',
      },
      manifest: true,
      minify: true,
      reportCompressedSize: true,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
})

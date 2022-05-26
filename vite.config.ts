import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    },
  },
  build:{
    lib:{
      entry: path.resolve(__dirname, 'index.html'),
      name: 'MyLib',
      formats: ['es','umd'],
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [vue()]
})

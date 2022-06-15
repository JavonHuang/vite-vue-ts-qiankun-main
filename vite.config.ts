import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base:'',
  server:{
    cors:{
      origin:true,
      allowedHeaders:['Access-Control-Allow-Origin,*'],
    },
    fs:{
      strict:false
    }
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    
    assetsDir: '',
    // lib:{
    //   entry: path.resolve(__dirname, 'index.html'),
    //   name: 'MyLib',
    //   formats: ['es','umd'],
    //   fileName: (format) => `my-lib.${format}.js`
    // },
    // rollupOptions: {
    //   output: {
    //     // inlineDynamicImports: true,
    //     chunkFileNames: '../[name]-[hash].js',
    //     entryFileNames: '../[name]-[hash].js',
    //     assetFileNames: '../[ext]/[name]-[hash].[ext]'
    //   },
    // },
  },
  plugins: [vue()]
})

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => { 
  return defineConfig({
    base: '',
    server: {
      port:3001,
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
      assetsDir: 'assets',
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
}

// export default defineConfig({
//   base: '',
//   publicDir:loadEnv(mode, process.cwd()).DEV?'',
//   server:{
//     cors:{
//       origin:true,
//       allowedHeaders:['Access-Control-Allow-Origin,*'],
//     },
//     fs:{
//       strict:false
//     }
//   },
//   resolve:{
//     alias:{
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     assetsDir: 'assets',
//     // lib:{
//     //   entry: path.resolve(__dirname, 'index.html'),
//     //   name: 'MyLib',
//     //   formats: ['es','umd'],
//     //   fileName: (format) => `my-lib.${format}.js`
//     // },
//     // rollupOptions: {
//     //   output: {
//     //     // inlineDynamicImports: true,
//     //     chunkFileNames: '../[name]-[hash].js',
//     //     entryFileNames: '../[name]-[hash].js',
//     //     assetFileNames: '../[ext]/[name]-[hash].[ext]'
//     //   },
//     // },
//   },
//   plugins: [vue()]
// })

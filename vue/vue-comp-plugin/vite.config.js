import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
      ]
    }),
  ],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'FormulaEditor',
      formats: ['es', 'umd'],
      fileName: (format) => `formula-editor.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
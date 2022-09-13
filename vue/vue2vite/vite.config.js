import { defineConfig, loadEnv } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue2'
import viteCompression from 'vite-plugin-compression'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import path from 'path';

const HOST = '0.0.0.0'
const resolve = (dir) => path.join(__dirname, dir)

export default ({ mode }/** if you want to use mode : { mode }*/) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    server: {
      host: HOST,
      port: env.VITE_PORT,
      proxy: {
        '/restApi': {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/restApi/, '')
        }
      }
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: 'import { h } from "vue";',
    },
    define: {'process.env': {}},
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve('src'),
        },
        {
          find: '@assets',
          replacement: resolve('src/assets'),
        },
        {
          find: '@components',
          replacement: resolve('src/components'),
        },
        {
          find: '@views',
          replacement: resolve('src/views'),
        },
        {
          find: '@store',
          replacement: resolve('src/store'),
        },
        {
          find: '@styles',
          replacement: resolve('src/styles'),
        },
        {
          find: '@mixins',
          replacement: resolve('src/mixins'),
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [
      vue(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      viteCompression(),
      viteCommonjs({ skipPreBuild: true }),
    ],
  })
}

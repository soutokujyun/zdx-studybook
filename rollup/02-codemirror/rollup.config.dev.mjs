import {nodeResolve} from "@rollup/plugin-node-resolve"

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload';

export default {
  input: "./editor.mjs",
  output: {
    file: "./dist/editor.bundle.js",
    format: "iife"
  },
  plugins: [
    nodeResolve(),
    livereload(),
    serve({
        open: true,
        port: 8888,
        openPage: '/index.html',
        contentBase: 'dist'
    })
  ]
}
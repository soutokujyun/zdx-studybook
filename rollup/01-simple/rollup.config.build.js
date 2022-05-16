import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
// import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer'

export default {
	input: "./src/main.js",
	output: {
		file: "dist/bundle.cjs.js",
		format: "cjs", // amd、cjs、system、esm（'es’也可以）、iife、umd
		name: "MyBundle",
        // sourcemap: true
        banner: '/* my-rollup */',
        footer: '/* follow me! @zengdexun */'
	},
    plugins: [ 
        typescript(),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**' // 排除node_modules文件夹下，只编译我们的源代码
        }),
        terser(),
        postcss({
            plugins:[
                autoprefixer()
            ]
        })
    ],
    external:['lodash'], //告诉rollup不要将此lodash打包，而作为外部依赖
    // global:{
    //     'jquery':'$' //告诉rollup 全局变量$即是jquery
    // },
};

import path from 'path'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import visualizer from 'rollup-plugin-visualizer'
import pkg from './package.json'

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    external(),
    postcss({
      extract: true,
      use: ['sass'],
      modules: {
        generateScopedName: function (name, filename) {
          const file = path.basename(filename, '.css')
          return (
            'dfo-organiztion' + '_' + file.split('.').shift() + '_' + name
          )
        },
      },
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    image(),
    visualizer(),
  ],
}

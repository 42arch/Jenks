import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
export default {
  input: 'src/index.ts',
  output: [
    {
      entryFileNames: 'lib/index.js',
      name: 'bundle',
      format: 'umd',
      dir: './',
      sourcemap: true
    },
    {
      entryFileNames: 'lib/index.min.js',
      name: 'bundle',
      format: 'umd',
      dir: './',
      sourcemap: true,
      plugins: [terser()]
    },
  ],
  plugins: [
    typescript({
        declaration: true,
        declarationDir: 'lib/types/',
        rootDir: 'src/',
        sourceMap: true,
        inlineSources: true
      })
  ]
}
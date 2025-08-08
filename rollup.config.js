import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true,
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.build.json',
            clean: true,
        }),
    ],
    external: ['react', 'react-dom', '@akitectio/aki-ui'],
});

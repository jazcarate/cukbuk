import { config } from 'dotenv';

import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			// stringify the object       
			__cukbuk: JSON.stringify({
				isProd: production,
				env: {
					IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
					...config().parsed
				}
			}),
		}),
		json(),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
			resolveJsonModule: true
		}),
		svelte({
			preprocess: sveltePreprocess(),
			dev: !production,
			css: css => {
				css.write('public/build/bundle.css');
			}
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		!production && serve(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}

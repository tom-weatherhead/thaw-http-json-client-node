// rollup.config.js

/* eslint-disable @typescript-eslint/no-var-requires */
// const http = require('http');
// const https = require('https');
// const rxjs = require('rxjs');

// const externalGlobals = require('rollup-plugin-external-globals');
import externalGlobals from 'rollup-plugin-external-globals';
// const { terser } = require('rollup-plugin-terser');
import { terser } from 'rollup-plugin-terser';
// rollup-plugin-node-polyfills

export default // [
	{
		input: './dist/lib/main.js',
		output: [
			{
				file: 'dist/thaw-http-json-client-node.cjs.js',
				format: 'cjs',
				exports: 'named' // ,
				// plugins: [
				// 	// terser(),
				// 	externalGlobals({ rxjs: 'rxjs', http: 'http', https: 'https' })
				// ]
			},
			{
				file: 'dist/thaw-http-json-client-node.esm.js',
				format: 'es',
				compact: true // ,
				// plugins: [
				// 	terser(),
				// 	externalGlobals({ rxjs: 'rxjs', http: 'http', https: 'https' })
				// ]
			},
			{
				file: 'dist/thaw-http-json-client-node.js',
				name: 'thaw-http-json-client-node',
				format: 'umd',
				compact: true // ,
				// plugins: [
				// 	terser(),
				// 	externalGlobals({ rxjs: 'rxjs', http: 'http', https: 'https' })
				// ]
			}
		],
		plugins: [
			terser(),
			externalGlobals({ rxjs: 'rxjs', http: 'http', https: 'https' })
		]
	}
// ]
;

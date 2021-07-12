// rollup.config.js

// import externalGlobals from 'rollup-plugin-external-globals';
import { terser } from 'rollup-plugin-terser';
// rollup-plugin-node-polyfills

export default {
	input: './dist/lib/main.js',
	output: [
		{
			file: 'dist/thaw-http-json-client-node.cjs.js',
			format: 'cjs',
			exports: 'named',
			globals: { rxjs: 'rxjs', http: 'http', https: 'https' }
		},
		{
			file: 'dist/thaw-http-json-client-node.esm.js',
			format: 'es',
			compact: true,
			globals: { rxjs: 'rxjs', http: 'http', https: 'https' }
		},
		{
			file: 'dist/thaw-http-json-client-node.js',
			name: 'thaw-http-json-client-node',
			format: 'umd',
			compact: true,
			globals: { rxjs: 'rxjs', http: 'http', https: 'https' }
		}
	],
	plugins: [
		terser() // ,
		// externalGlobals({ rxjs: 'rxjs', http: 'http', https: 'https' })
		// externalGlobals({ http: 'http', https: 'https' })
	]
};

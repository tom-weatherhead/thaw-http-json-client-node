// rollup.config.js

// import externalGlobals from 'rollup-plugin-external-globals';
import { terser } from 'rollup-plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: './dist/lib/main.js',
	output: [
		{
			file: 'dist/thaw-http-json-client-node.cjs.js',
			format: 'cjs',
			exports: 'named',
			// external: ['http', 'https'] // ,
			globals: { http: 'http', https: 'https' }
		},
		{
			file: 'dist/thaw-http-json-client-node.esm.js',
			format: 'es',
			compact: true,
			// external: ['http', 'https'] // ,
			globals: { http: 'http', https: 'https' }
		// },
		// {
		// 	file: 'dist/thaw-http-json-client-node.js',
		// 	name: 'thaw-http-json-client-node',
		// 	format: 'umd',
		// 	compact: true,
		// 	// external: ['http', 'https'] // ,
		// 	globals: { http: 'http', https: 'https' }
		}
	],
	external: ['http', 'https'],
	plugins: [
		nodePolyfills(),
		nodeResolve({ preferBuiltins: false }),
		terser() // ,
		// externalGlobals({ rxjs: 'rxjs', http: 'http', https: 'https' })
		// externalGlobals({ http: 'http', https: 'https' })
	]
};

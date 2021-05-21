// rollup.config.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { terser } = require('rollup-plugin-terser');

export default [
	{
		input: './dist/types/main.js',
		output: [
			{
				file: 'dist/thaw-http-json-client-node.cjs.js',
				format: 'cjs',
				exports: 'named'
			},
			{
				file: 'dist/thaw-http-json-client-node.esm.js',
				format: 'es',
				compact: true,
				plugins: [terser()]
			},
			{
				file: 'dist/thaw-http-json-client-node.js',
				name: 'thaw-http-json-client-node',
				format: 'umd',
				compact: true,
				plugins: [terser()]
			}
		]
	}
];

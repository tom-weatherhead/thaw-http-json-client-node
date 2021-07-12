// src/main.ts

import { from, Observable } from 'rxjs';

// import { IncomingMessage, request, RequestOptions } from 'http';
import { ClientRequest, IncomingMessage } from 'http';
// import { request, RequestOptions } from 'https';

import { IHttpJsonClient } from 'thaw-types';

import { createHttpRequest } from './create-http-request';
import { createHttpsRequest } from './create-https-request';

// Based on the JSON fetching example from https://nodejs.org/api/http.html

function httpRequestAsPromise(
	url: string,
	methodParam?: string,
	body?: unknown
): Promise<string> {
	const method = typeof methodParam !== 'undefined' ? methodParam : 'GET';
	const isMethodThatSendsBody = ['POST', 'PUT', 'PATCH'].indexOf(method) >= 0;
	// const options: RequestOptions = {
	// 	method
	// };
	let bodyAsString = '';
	let contentLength = NaN;

	if (isMethodThatSendsBody && typeof body !== 'undefined') {
		bodyAsString = JSON.stringify(body);
		contentLength = Buffer.byteLength(bodyAsString);
		// options.headers = {
		// 	'Content-Type': 'application/json',
		// 	'Content-Length': Buffer.byteLength(bodyAsString)
		// };
	}

	return new Promise(
		(resolve: (result: string) => void, reject: (error: Error) => void) => {
			let request: ClientRequest;
			const callback = (res: IncomingMessage) => {
				// Returns: <http.ClientRequest>
				const { statusCode, statusMessage } = res;
				// const contentType = res.headers['content-type'];
				let error;

				// console.log();
				// // console.log('typeof res', typeof res);
				// console.log(`Response status: ${statusCode} ${statusMessage}`);
				// console.log('Content type:', contentType);
				// console.log();

				if (
					typeof statusCode === 'undefined' ||
					statusCode < 200 ||
					statusCode >= 300
				) {
					error = new Error(
						'Request Failed.\n' +
							`Status Code: ${statusCode} ${statusMessage}`
					);
					// } else if (!/^application\/json/.test(contentType)) {
					// 	error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
				}

				if (error) {
					console.error(error.message);
					// Consume response data to free up memory
					res.resume();
					reject(error);

					return;
				}

				res.setEncoding('utf8');

				let rawData = '';

				res.on('data', (chunk: string) => {
					rawData += chunk;
				});

				res.on('end', () => {
					resolve(rawData);
					// try {
					// 	const parsedData = rawData;

					// 	console.log(parsedData);
					// 	resolve(parsedData);
					// } catch (error) {
					// 	console.error(error.message);
					// 	reject(error);
					// }
				});
			};

			if (url.startsWith('http://')) {
				request = createHttpRequest(
					url,
					method,
					contentLength,
					callback
				);
			} else if (url.startsWith('https://')) {
				request = createHttpsRequest(
					url,
					method,
					contentLength,
					callback
				);
			} else {
				throw new Error(
					`thaw-http-json-client-node: Unrecognized protocol in url: ${url}`
				);
			}

			request.on('error', (error: Error) => {
				console.error(`Got error: ${error.message}`);
				reject(error);
			});

			if (isMethodThatSendsBody && typeof body !== 'undefined') {
				// Write data to request body

				// body is e.g.:
				// const body = querystring.stringify({
				// 	'msg': 'Hello World!'
				// });

				request.write(bodyAsString);
			}

			request.end();
		}
	);
}

function parseJSON<T>(s: string): T {
	let parseResult;

	try {
		parseResult = JSON.parse(s);
	} catch (error) {
		console.error(`parseJSON() : Error while parsing '${s}'`);
	}

	if (typeof parseResult === 'undefined') {
		throw new Error('JSON parse error');
	}

	const castResult = parseResult as T;

	if (typeof parseResult === 'undefined') {
		throw new Error('JSON parse: cast error');
	}

	return castResult;
}

function httpRequest<T>(
	url: string,
	methodParam?: string,
	body?: unknown
): Observable<T> {
	return from(
		httpRequestAsPromise(url, methodParam, body).then((result: string) =>
			Promise.resolve(parseJSON<T>(result))
		)
	);
}

// An HTTP JSON client for non-Angular Node.js apps.

class HttpJsonClient implements IHttpJsonClient {
	// NOTE BENE: Using async/await causes rollup to issue a warning about 'this' being undefined.
	// See https://rollupjs.org/guide/en/#error-this-is-undefined

	public get<T>(url: string): Observable<T> {
		return httpRequest<T>(url);
	}

	public post(url: string, body: unknown): Observable<unknown> {
		return httpRequest<unknown>(url, 'POST', body);
	}

	public put(url: string, body: unknown): Observable<unknown> {
		return httpRequest<unknown>(url, 'PUT', body);
	}

	public patch(url: string, body: unknown): Observable<unknown> {
		return httpRequest<unknown>(url, 'PATCH', body);
	}

	public delete<T>(url: string): Observable<T> {
		return httpRequest<T>(url, 'DELETE');
	}

	public head<T>(url: string): Observable<T> {
		return httpRequest<T>(url, 'HEAD');
	}

	public options<T>(url: string): Observable<T> {
		return httpRequest<T>(url, 'OPTIONS');
	}
}

export function createHttpJsonClient(): IHttpJsonClient {
	return new HttpJsonClient();
}

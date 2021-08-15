// src/main.ts

import { from, Observable } from 'rxjs';

import { ClientRequest, IncomingMessage } from 'http';

import { IHttpClient, IHttpJsonClient } from 'thaw-types';

import { createHttpRequest } from './create-http-request';
import { createHttpsRequest } from './create-https-request';

// export interface IHttpClient {
// 	get(url: string): Observable<string>;
// }

// Based on the JSON fetching example from https://nodejs.org/api/http.html

function httpRequestAsPromise(url: string, methodParam?: string, body?: unknown): Promise<string> {
	const method = typeof methodParam !== 'undefined' ? methodParam : 'GET';
	const isMethodThatSendsBody = ['POST', 'PUT', 'PATCH'].indexOf(method) >= 0;
	let bodyAsString = '';
	let contentLength = NaN;

	if (isMethodThatSendsBody && typeof body !== 'undefined') {
		bodyAsString = JSON.stringify(body);
		contentLength = Buffer.byteLength(bodyAsString);
	}

	return new Promise((resolve: (result: string) => void, reject: (error: Error) => void) => {
		let request: ClientRequest;
		const callback = (res: IncomingMessage) => {
			const { statusCode, statusMessage } = res;
			// const contentType = res.headers['content-type'];
			let error;

			// console.log();
			// // console.log('typeof res', typeof res);
			// console.log(`Response status: ${statusCode} ${statusMessage}`);
			// console.log('Content type:', contentType);
			// console.log();

			if (typeof statusCode === 'undefined' || statusCode < 200 || statusCode >= 300) {
				error = new Error(
					'Request Failed.\n' + `Status Code: ${statusCode} ${statusMessage}`
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
			});
		};

		if (url.startsWith('http://')) {
			request = createHttpRequest(url, method, contentLength, callback);
		} else if (url.startsWith('https://')) {
			request = createHttpsRequest(url, method, contentLength, callback);
		} else {
			throw new Error(`thaw-http-json-client-node: Unrecognized protocol in url: ${url}`);
		}

		request.on('error', (error: Error) => {
			console.error(`Got error: ${error.message}`);
			reject(error);
		});

		if (isMethodThatSendsBody && typeof body !== 'undefined') {
			request.write(bodyAsString);
		}

		request.end();
	});
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

	// if (!(castResult instanceof T)) { ... } ?
	if (typeof castResult === 'undefined') {
		throw new Error('JSON parse: cast error');
	}

	return castResult;
}

function httpRequest(url: string, methodParam?: string, body?: unknown): Observable<string> {
	return from(httpRequestAsPromise(url, methodParam, body));
}

function httpJsonRequest<T>(url: string, methodParam?: string, body?: unknown): Observable<T> {
	return from(
		httpRequestAsPromise(url, methodParam, body).then((result: string) =>
			Promise.resolve(parseJSON<T>(result))
		)
	);
}

class HttpClient implements IHttpClient {
	public get(url: string): Observable<string> {
		return httpRequest(url);
	}
}

// An HTTP JSON client for non-Angular Node.js apps.

class HttpJsonClient implements IHttpJsonClient {
	// NOTE BENE: Using async/await causes rollup to issue a warning about 'this' being undefined.
	// See https://rollupjs.org/guide/en/#error-this-is-undefined

	public get<T>(url: string): Observable<T> {
		return httpJsonRequest<T>(url);
	}

	public post(url: string, body: unknown): Observable<unknown> {
		return httpJsonRequest<unknown>(url, 'POST', body);
	}

	public put(url: string, body: unknown): Observable<unknown> {
		return httpJsonRequest<unknown>(url, 'PUT', body);
	}

	public patch(url: string, body: unknown): Observable<unknown> {
		return httpJsonRequest<unknown>(url, 'PATCH', body);
	}

	public delete<T>(url: string): Observable<T> {
		return httpJsonRequest<T>(url, 'DELETE');
	}

	public head<T>(url: string): Observable<T> {
		return httpJsonRequest<T>(url, 'HEAD');
	}

	public options<T>(url: string): Observable<T> {
		return httpJsonRequest<T>(url, 'OPTIONS');
	}
}

export function createHttpClient(): IHttpClient {
	return new HttpClient();
}

export function createHttpJsonClient(): IHttpJsonClient {
	return new HttpJsonClient();
}

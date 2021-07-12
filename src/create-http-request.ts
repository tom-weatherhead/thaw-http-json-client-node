// src/create-http-request.ts

import { ClientRequest, IncomingMessage, request, RequestOptions } from 'http';

export function createHttpRequest(
	url: string,
	method: string,
	contentLength: number,
	callback: (res: IncomingMessage) => void
): ClientRequest {
	const options: RequestOptions = {
		method
	};

	if (!Number.isNaN(contentLength)) {
		options.headers = {
			'Content-Type': 'application/json',
			'Content-Length': contentLength
		};
	}

	return request(url, options, callback);
}

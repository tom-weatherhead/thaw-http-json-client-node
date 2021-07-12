// src/create-https-request.ts

import { ClientRequest, IncomingMessage } from 'http';
import { request, RequestOptions } from 'https';

export function createHttpsRequest(
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

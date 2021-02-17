import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const searchService = {
    searchWeb,
    getLogs
};

function searchWeb(url, expression) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, expression })
    };

    return fetch(`${config.apiUrl}/search/searchWeb`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function getLogs() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/search/getLogs`, requestOptions).then(handleResponse);
}


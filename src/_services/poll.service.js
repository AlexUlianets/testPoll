import config from 'config';
import { handleResponse  } from '../_helpers';

export const pollService = {
    create
};

function create(user, questions) {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, questions })
    };

    return fetch(`${config.apiUrl}/create`,  requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

import axios from 'axios';

export async function authenticate(data) {
    const request = axios.post('api/auth', data);
    const response = await request;
    return response.data;
}

export const items = {
    async find(token) {
        const request = axios.get('api/items', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const response = await request;
        return response.data;
    },

    async post(data, token) {
        const request = axios.post('api/items', data, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return (await request).data;
    },

    async patch(id, data, token) {
        const request = axios.patch('api/items/' + id, data, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return (await request).data;
    },

    async delete(id, token) {
        const request = axios.delete('api/items/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return (await request).data;
    },
};

export const transients = {
    async findAll(token) {
        const request = axios.get('api/transients', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return (await request).data;
    },

    async post(data, token) {
        const request = axios.post('api/transients', data, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return (await request).data;
    },

    async patch(id, data, token) {
        const request = axios.patch('api/transients/' + id, data, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return (await request).data;
    },

    async delete(id, token) {
        const request = axios.delete('api/transients/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return (await request).data;
    },
};

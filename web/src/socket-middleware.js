import { io } from 'socket.io-client';
import { actions } from './item.redux.js';

export default () => {
    return store  => {
        const socket = io('/items', {
            auth: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InJvbmkiLCJpYXQiOjE2MTI4OTM3MjR9.KgbBJtx8KOzxY2FdOFLgzkgoU7iNCY-Z_lP6CVGVSiU'
            }
        });

        socket.on('post', data => {
            store.dispatch(actions.addOne(data));
        });

        socket.on('patch', data => {
            store.dispatch(actions.updateOne({
                id: data.id,
                changes: data
            }));
        });

        socket.on('delete', data => {
            store.dispatch(actions.removeOne(data.id));
        });

        return next => action => next(action);
    }
}

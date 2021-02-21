import { io } from 'socket.io-client';
import { actions } from './item.redux.js';
import {
    authenticate,
    selector as tokenSelector,
} from './auth.redux.js';

export default () => {
    return (store) => {
        let token = tokenSelector(store.getState());
        let socket;

        if (token) {
            socket = io('/items', {
                auth: { token },
            });
        }

        if (socket) {
            socket.on('post', (data) => {
                store.dispatch(actions.addOne(data));
            });

            socket.on('patch', (data) => {
                store.dispatch(
                    actions.updateOne({
                        id: data.id,
                        changes: data,
                    })
                );
            });

            socket.on('delete', (data) => {
                store.dispatch(actions.removeOne(data.id));
            });
        }

        return (next) => (action) => {
            if (
                action.type &&
                action.type === authenticate.fulfilled.type
            ) {
                token = action.payload;
                socket = io('/items', {
                    auth: { token },
                });
                socket.on('post', (data) => {
                    store.dispatch(actions.addOne(data));
                });

                socket.on('patch', (data) => {
                    store.dispatch(
                        actions.updateOne({
                            id: data.id,
                            changes: data,
                        })
                    );
                });

                socket.on('delete', (data) => {
                    store.dispatch(actions.removeOne(data.id));
                });
            }
            return next(action);
        };
    };
};

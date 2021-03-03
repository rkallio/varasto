import { io } from 'socket.io-client';
import { actions as itemActions } from './items/item.redux.js';
import { actions as transientActions } from './transients/transient.redux.js';
import {
    authenticate,
    selector as tokenSelector,
} from './auth.redux.js';

const subscribeForItemUpdates = (store, socket) => {
    socket.on('post', (data) =>
        store.dispatch(itemActions.addOne(data))
    );
    socket.on('patch', (data) =>
        store.dispatch(
            itemActions.updateOne({ id: data.id, changes: data })
        )
    );
    socket.on('delete', (data) =>
        store.dispatch(itemActions.removeOne(data.id))
    );
};

const subscribeForTransientUpdates = (store, socket) => {
    socket.on('post', (data) =>
        store.dispatch(transientActions.addOne(data))
    );
    socket.on('patch', (data) =>
        store.dispatch(
            transientActions.updateOne({ id: data.id, changes: data })
        )
    );
    socket.on('delete', (data) =>
        store.dispatch(transientActions.removeOne(data.id))
    );
    socket.on('deleteMany', (data) =>
        store.dispatch(
            transientActions.removeMany(data.map((p) => p.id))
        )
    );
};

export default () => {
    return (store) => {
        let token = tokenSelector(store.getState());

        let items, transients;

        if (token) {
            items = io('/items', {
                auth: { token },
            });
            transients = io('/transients', {
                auth: { token },
            });

            subscribeForItemUpdates(store, items);
            subscribeForTransientUpdates(store, transients);
        }

        return (next) => (action) => {
            if (
                action.type &&
                action.type === authenticate.fulfilled.type
            ) {
                token = action.payload;
                items = io('/items', {
                    auth: { token },
                });
                transients = io('/transients', {
                    auth: { token },
                });
                subscribeForItemUpdates(store, items);
                subscribeForTransientUpdates(store, transients);
            }
            return next(action);
        };
    };
};

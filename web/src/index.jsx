import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux.js';
import App from './app.jsx';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

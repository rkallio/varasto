import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selector as tokenSelector } from './login/auth.redux.js';

import LoginPage from './pages/login-page.jsx';
import ItemPage from './pages/item-page.jsx';

import Modal from './modal/modal.jsx';

export default () => {
    return (
        <>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <ProtectedRoute path="/items">
                    <ItemPage />
                </ProtectedRoute>
                <Route path="/">
                    <RootRedirect />
                </Route>
            </Switch>
            <Modal />
        </>
    );
};

const RootRedirect = () => {
    const token = useSelector(tokenSelector);
    const history = useHistory();

    useEffect(() => {
        if (token) {
            history.push('/items');
        } else {
            history.push('/login');
        }
    }, [token]);

    return null;
};

const ProtectedRoute = (props) => {
    const history = useHistory();
    const token = useSelector(tokenSelector);
    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
    }, [token]);

    const { children, ...rest } = props;

    return <Route {...rest}>{children}</Route>;
};

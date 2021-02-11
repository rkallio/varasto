import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selector as tokenSelector } from './auth.redux.js';

import { LoginPage } from './login-page.jsx';
import ItemPage from './item-page.jsx';

import ReactModal from 'react-modal';

import { useForm }  from 'react-hook-form';
import AddItem from './add-item.jsx';
import EditItem from './edit-item.jsx';
import Modal from './modal.jsx';

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
}

const RootRedirect = () => {
    const token = useSelector(tokenSelector);
    const history = useHistory();

    useEffect(() => {
        if(token) {
            history.push('/items');
        } else {
            history.push('/login');
        }
    }, [token])

    return null;
}


const ProtectedRoute = (props) => {
    const history = useHistory();
    const token = useSelector(tokenSelector);
    useEffect(() => {
        if(!token) {
            history.push('/login');
        }
    }, [token]);

    const { children, ...rest } = props;

    return (
        <Route {...rest }>
               {
                   children
               }
        </Route>
    );
}

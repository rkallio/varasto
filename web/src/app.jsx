import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route } from 'react-router-dom';

import LoginPage from './login-page.jsx';
// import ItemPage from './item-page.jsx';

export default () => {
    return (
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
        </Switch>
    );
}

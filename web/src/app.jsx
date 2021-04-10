import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selector as tokenSelector } from './login/auth.redux.js';

import LoginPage from './pages/login-page.jsx';
import ItemPage from './pages/item-page.jsx';

import Modal from './modal/modal.jsx';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  font-size: 1.2rem;
  font-family: sans;
}

input {
  font-size: inherit;
}

button {
  font-size: inherit;
}

select {
  font-size: inherit;
}

button {
  font-family: inherit;
}
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
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

export default App;

const RootRedirect = () => {
  const token = useSelector(tokenSelector);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.replace('/items');
    } else {
      history.replace('/login');
    }
  }, [token]);

  return null;
};

const ProtectedRoute = (props) => {
  const history = useHistory();
  const token = useSelector(tokenSelector);
  useEffect(() => {
    if (!token) {
      history.replace('/login');
    }
  }, [token]);

  const { children, ...rest } = props;

  return <Route {...rest}>{children}</Route>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

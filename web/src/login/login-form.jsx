import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useLoginForm from './use-login-form.js';
import { UsernameInput, PasswordInput } from './login-components.jsx';
import * as Forms from '../components/form-components.jsx';
import { authenticate } from './auth.redux.js';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dispatcher = async (values) => {
    const result = await dispatch(authenticate(values));
    if (result.type === authenticate.fulfilled.type) {
      history.push('/');
    }
  };

  const { values, handleChange, onSubmit } = useLoginForm({
    defaults: {},
    dispatcher,
  });

  return (
    <form onSubmit={onSubmit}>
      <UsernameInput
        required
        value={values.name}
        onChange={handleChange}
      />
      <PasswordInput
        required
        value={values.password}
        onChange={handleChange}
      />
      <Forms.ButtonGroup>
        <Forms.Button primary type="submit">
          Log in
        </Forms.Button>
      </Forms.ButtonGroup>
    </form>
  );
};

export default LoginForm;

import React, { forwardRef } from 'react';
import { authenticate } from './auth.redux.js';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as css from './login-page.module.css';

import { FieldContainer, LabeledInput } from './forms.jsx';

const UsernameInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="name"
            ref={ref}
            label="Name"
            {...props}
        />
    );
});

const PasswordInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="password"
            ref={ref}
            label="Password"
            type="password"
            {...props}
        />
    );
});

export default LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const onSubmit = async data => {
        const result = await dispatch(authenticate(data));
        if(result.type === authenticate.fulfilled.type) {
            history.push('/');
        }
    }

    return (
        <form className={css.form}
              onSubmit={handleSubmit(onSubmit)}
        >
            <UsernameInput ref={register} required />
            <PasswordInput ref={register} required />
            <FieldContainer>
                <input type="submit" />
            </FieldContainer>
        </form>
    );
}

export const LoginPage = (props) => {
    return (
        <div className={css.container}>
            <LoginForm />
        </div>
    );
}

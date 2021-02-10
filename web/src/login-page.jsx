import React from 'react';
import { authenticate } from './auth.redux.js';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as css from './login-page.module.css';

import { FieldContainer, LabeledInput } from './forms.jsx';

const LoginPage = () => {
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
              onSubmit={handleSubmit(onSubmit)}>
            <LabeledInput
                name="name"
                ref={register}
                label="Name"
                required
            />
            <LabeledInput
                name="password"
                type="password"
                ref={register}
                label="Password"
                required
            />
            <FieldContainer>
                <input
                    type="submit" />
            </FieldContainer>
        </form>
    );
}

export default () => {
    return (
        <div className={css.container}>
            <LoginPage />
        </div>
    );
}

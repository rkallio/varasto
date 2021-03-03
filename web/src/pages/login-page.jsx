import React, { useState } from 'react';
import { authenticate } from '../auth.redux.js';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from '../container.jsx';
import * as css from './login-page.module.css';

import {
    FieldContainer,
    ButtonGroup,
    Button,
    LabeledInput,
} from '../forms.jsx';

const useLogin = ({ defaults, dispatcher }) => {
    const [name, setName] = useState(
        defaults && defaults.name ? defaults.name : ''
    );
    const [password, setPassword] = useState(
        defaults && defaults.password ? defaults.password : ''
    );

    const values = {
        name,
        password,
    };
    const setters = { name: setName, password: setPassword };

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setters[field](value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatcher(values);
    };

    return { values, handleChange, onSubmit };
};

const UsernameInput = (props) => {
    return <LabeledInput name="name" label="Name" {...props} />;
};

const PasswordInput = (props) => {
    return (
        <LabeledInput
            name="password"
            label="Password"
            type="password"
            {...props}
        />
    );
};

export const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const dispatcher = async (values) => {
        const result = await dispatch(authenticate(values));
        if (result.type === authenticate.fulfilled.type) {
            history.push('/');
        }
    };

    const { values, handleChange, onSubmit } = useLogin({
        defaults: {},
        dispatcher,
    });

    return (
        <form className={css.form} onSubmit={onSubmit}>
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
            <FieldContainer>
                <ButtonGroup>
                    <Button type="submit">Submit</Button>
                </ButtonGroup>
            </FieldContainer>
        </form>
    );
};

export default LoginPage = (props) => {
    return (
        <Container>
            <LoginForm />
        </Container>
    );
};

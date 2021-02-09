import React, { forwardRef } from 'react';
import { authenticate } from './auth.redux.js';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as css from './login-page.module.css';

const appendAstIf = (text, cond) => {
    if(cond) {
        return text + '*';
    } else {
        return text;
    }
}

const InputContainer = (props) => {
    return (
        <div className={css.inputContainer}>
             { props.children }
        </div>
    )
}
const LabeledInput = forwardRef((props, ref) => {
    const { label, ...rest } = props;

    return (
        <InputContainer>
            <label className={css.label} htmlFor={rest.name}>
                {appendAstIf(label, props.required)}
            </label>
            <input className={css.input} ref={ref} {...rest} />
        </InputContainer>
    )
})

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const onSubmit = async data => {
        const result = await dispatch(authenticate(data));
        if(result.type === authenticate.fulfilled.type) {
            // reroute
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
            <InputContainer>
                <input
                    type="submit" />
            </InputContainer>
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

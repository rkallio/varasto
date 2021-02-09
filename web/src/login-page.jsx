import React from 'react';
import { authenticate } from './auth.redux.js';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const onSubmit = async data => {
        const result = await dispatch(authenticate(data));
        if(result.type === authenticate.fulfilled.type) {
            // reroute
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    ref={register} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    ref={register} />
            </div>
            <input
                type="submit" />
        </form>
    );
}

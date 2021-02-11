import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postItem } from './item.redux.js';
import { actions } from './modal.redux.js';
import * as Forms from './forms.jsx';
import * as Items from './items.jsx';

export default AddItem = () => {
    const dispatch = useDispatch();
    const { register, reset, handleSubmit } = useForm();

    const onSubmit = async data => {
        dispatch(postItem(data));
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}>
            <Items.NameInput
                ref={register}
                required
            />
            <Items.LocationInput
                ref={register}
                required
            />
            <Items.CurrentQuantityInput
                ref={register}
                required
            />
            <Items.TargetQuantityInput
                ref={register}
                required
            />
            <Forms.FieldContainer>
                <Forms.ButtonGroup>
                    <input type="submit" />
                    <button
                        type="button"
                        onClick={() => dispatch(actions.closeModal())}
                    >
                        Close
                    </button>
                </Forms.ButtonGroup>
            </Forms.FieldContainer>
        </form>
    );
}

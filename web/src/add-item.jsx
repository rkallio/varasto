import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postItem } from './item.redux.js';
import { actions } from './modal.redux.js';
import * as Forms from './forms.jsx';

export default AddItem = () => {
    const dispatch = useDispatch();
    const { register, reset, handleSubmit } = useForm();

    const onSubmit = async data => {
        dispatch(postItem(data));
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}>
            <Forms.LabeledInput
                name="name"
                ref={register}
                label="Name"
                required
            />
            <Forms.LabeledInput
                name="location"
                ref={register}
                label="Location"
                required
            />
            <Forms.LabeledInput
                name="currentQuantity"
                ref={register}
                label="currentQuantity"
                required
            />
            <Forms.LabeledInput
                name="targetQuantity"
                ref={register}
                label="targetQuantity"
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

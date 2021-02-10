import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { patchItem } from './item.redux.js';
import { actions, modalSelector } from './modal.redux.js';
import { itemSelector } from './item.redux.js';
import * as Forms from './forms.jsx';

export default EditItem = () => {
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();

    const item = useSelector(state => {
        const id = modalSelector(state).id;
        const item = itemSelector.selectById(state, id);
        return item;
    });


    const onSubmit = async data => {
        const result = await dispatch(patchItem({id: item.id, data}));
        if(result.type === patchItem.fulfilled.type) {
            dispatch(actions.closeModal());
        }
    }

    return (
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <Forms.LabeledInput
                    name="name"
                    ref={register}
                    label="Name"
                    defaultValue={item.name}
                    placeholder={item.name}
                    required
                />
                <Forms.LabeledInput
                    name="locationn"
                    ref={register}
                    label="Location"
                    defaultValue={item.location}
                    placeholder={item.location}
                    required
                />
                <Forms.LabeledInput
                    name="currentQuantity"
                    ref={register}
                    label="Current Quantity"
                    defaultValue={item.currentQuantity}
                    placeholder={item.targetQuantity}
                    required
                />

                <Forms.LabeledInput
                    name="targetQuantity"
                    ref={register}
                    label="Target Quantity"
                    defaultValue={item.targetQuantity}
                    placeholder={item.targetQuantity}
                    required
                />
                <Forms.FieldContainer>
                    <Forms.ButtonGroup>
                        <input type="submit" />
                        <button onClick={() => dispatch(actions.closeModal())}>Close</button>
                    </Forms.ButtonGroup>
                </Forms.FieldContainer>
            </form>
    );
}

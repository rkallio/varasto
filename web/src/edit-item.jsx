import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { patchItem, deleteItem } from './item.redux.js';
import { actions, modalSelector } from './modal.redux.js';
import { itemSelector } from './item.redux.js';
import * as Forms from './forms.jsx';
import * as Items from './items.jsx';
import Container from './container.jsx';

export default EditItem = () => {
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();

    const item = useSelector(state => {
        const id = modalSelector(state).id;
        const item = itemSelector.selectById(state, id);
        return item;
    });

    const remove = () => dispatch(deleteItem(item.id));

    const onSubmit = async data => {
        const result = await dispatch(patchItem({id: item.id, data}));
        if(result.type === patchItem.fulfilled.type) {
            dispatch(actions.closeModal());
        }
    }

    return (
        <Container>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <Items.NameInput
                    ref={register}
                    defaultValue={item.name}
                    placeholder={item.name}
                    required
                />
                <Items.LocationInput
                    ref={register}
                    defaultValue={item.location}
                    placeholder={item.location}
                    required
                />
                <Items.CurrentQuantityInput
                    ref={register}
                    defaultValue={item.currentQuantity}
                    placeholder={item.currentQuantity}
                    required
                />
                <Items.TargetQuantityInput
                    ref={register}
                    defaultValue={item.targetQuantity}
                    placeholder={item.targetQuantity}
                    required
                />
                <Forms.FieldContainer>
                    <Forms.ButtonGroup>
                        <Forms.Button type="submit">Submit</Forms.Button>
                        <Forms.Button
                            onClick={
                                () => dispatch(actions.closeModal())
                            }>
                            Close
                        </Forms.Button>

                    </Forms.ButtonGroup>

                </Forms.FieldContainer>
                <Forms.FieldContainer>
                    <Forms.ButtonGroup>
                        <Forms.Button type="button" onClick={remove}>
                            Delete
                        </Forms.Button>
                    </Forms.ButtonGroup>
                </Forms.FieldContainer>
            </form>
        </Container>
    );
}

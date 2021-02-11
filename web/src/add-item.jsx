import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postItem } from './item.redux.js';
import { actions } from './modal.redux.js';
import * as Forms from './forms.jsx';
import * as Items from './items.jsx';
import Container from './container.jsx';

export default AddItem = () => {
    const dispatch = useDispatch();
    const { register, reset, handleSubmit } = useForm();

    const onSubmit = async data => {
        dispatch(postItem(data));
    }

    return (
        <Container>
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
                        <Forms.Button type="submit">
                            Submit
                        </Forms.Button>
                        <Forms.Button
                            type="button"
                            onClick={
                                () => dispatch(actions.closeModal())
                            }
                        >
                            Close
                        </Forms.Button>
                    </Forms.ButtonGroup>
                </Forms.FieldContainer>
            </form>
        </Container>
    );
}

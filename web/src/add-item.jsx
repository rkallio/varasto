import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postItem } from './item.redux.js';
import { actions } from './modal.redux.js';
import * as Forms from './forms.jsx';
import * as Items from './items.jsx';
import Container from './container.jsx';
import If from './if.jsx';
import useItemForm from './use-item-form.js';

export default AddItem = () => {
    const dispatch = useDispatch();
    const { values, handleChange, onSubmit } = useItemForm(
        {},
        postItem
    );

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Items.NameInput
                    value={values.name}
                    onChange={handleChange}
                    required
                />
                <Items.LocationInput
                    value={values.location}
                    onChange={handleChange}
                    required
                />
                <Items.CurrentQuantityInput
                    value={values.currentQuantity}
                    onChange={handleChange}
                    required
                />
                <If cond={values.measure !== '%'}>
                    <Items.TargetQuantityInput
                        value={values.targetQuantity}
                        onChange={handleChange}
                        required
                    />
                </If>
                <Items.MeasureInput
                    value={values.measure}
                    onChange={handleChange}
                />
                <Forms.FieldContainer>
                    <Forms.ButtonGroup>
                        <Forms.Button type="submit">
                            Submit
                        </Forms.Button>
                        <Forms.Button
                            type="button"
                            onClick={() =>
                                dispatch(actions.closeModal())
                            }
                        >
                            Close
                        </Forms.Button>
                    </Forms.ButtonGroup>
                </Forms.FieldContainer>
            </form>
        </Container>
    );
};

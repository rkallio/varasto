import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    postItem,
    patchItem,
    deleteItem,
    itemSelector,
} from './item.redux.js';
import { Button } from '../components/form-components.jsx';
import PropTypes from 'prop-types';
import If from '../components/if.jsx';
import useItemForm from './use-item-form.js';
import * as Items from './item-components.jsx';
import * as Forms from '../components/form-components.jsx';

export default ItemForm = (props) => {
    const item = useSelector((state) =>
        itemSelector.selectById(state, props.id)
    );

    const { values, handleChange, onSubmit } = useItemForm({
        defaults: item,
        dispatcher: props.dispatcher,
    });

    return (
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
            <Items.MeasureInput
                value={values.measure}
                onChange={handleChange}
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
            <Forms.FieldContainer>
                <Forms.ButtonGroup>
                    <Forms.Button type="submit">Submit</Forms.Button>
                    {props.actionButtons}
                </Forms.ButtonGroup>
            </Forms.FieldContainer>
        </form>
    );
};

ItemForm.propTypes = {
    id: PropTypes.number,
    dispatcher: PropTypes.func.isRequired,
    actionButtons: PropTypes.arrayOf(PropTypes.element),
};

export const AddItemForm = () => {
    const dispatch = useDispatch();
    const dispatcher = (values) => dispatch(postItem(values));

    return (
        <ItemForm
            dispatcher={dispatcher}
            actionButtons={[<CloseModalButton key="close-modal" />]}
        />
    );
};

export const EditItemForm = ({ id }) => {
    const dispatch = useDispatch();

    const item = useSelector((state) =>
        itemSelector.selectById(state, id)
    );

    const dispatcher = (values) => {
        return dispatch(patchItem({ id: id, data: values }));
    };

    const removeItem = () => dispatch(deleteItem(id));

    return (
        <ItemForm
            id={id}
            dispatcher={dispatcher}
            actionButtons={[
                <Button
                    key="remove"
                    type="button"
                    onClick={() => {
                        dispatch(deleteItem(id));
                    }}
                >
                    Delete
                </Button>,
                <CloseModalButton key="close-modal" />,
            ]}
        />
    );
};

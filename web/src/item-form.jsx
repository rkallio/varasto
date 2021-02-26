import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import If from './if.jsx';
import useItemForm from './use-item-form.js';
import { itemSelector } from './item.redux.js';
import * as Items from './items.jsx';
import * as Forms from './forms.jsx';

const ItemForm = (props) => {
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

export default ItemForm;

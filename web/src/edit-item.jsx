import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchItem, deleteItem, itemSelector } from './item.redux.js';
import { actions } from './modal.redux.js';
import { Button } from './forms.jsx';
import ItemForm from './item-form.jsx';

export default EditItem = ({ id }) => {
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
                <Button
                    key="close"
                    type="button"
                    onClick={() => {
                        dispatch(actions.closeModal());
                    }}
                >
                    Close
                </Button>,
            ]}
        />
    );
};

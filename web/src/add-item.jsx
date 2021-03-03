import React from 'react';
import { useDispatch } from 'react-redux';
import { postItem } from './item.redux.js';
import { actions } from './modal.redux.js';
import ItemForm from './items/item-form.jsx';
import { Button } from './components/form-components.jsx';

export default AddItem = () => {
    const dispatch = useDispatch();
    const dispatcher = (values) => dispatch(postItem(values));

    return (
        <ItemForm
            dispatcher={dispatcher}
            actionButtons={[
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

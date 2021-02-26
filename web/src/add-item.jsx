import React from 'react';
import { useDispatch } from 'react-redux';
import { postItem } from './item.redux.js';
import { actions } from './modal.redux.js';
import Container from './container.jsx';
import ItemForm from './item-form.jsx';
import { Button } from './forms.jsx';

export default AddItem = () => {
    const dispatch = useDispatch();

    return (
        <Container>
            <ItemForm
                method={postItem}
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
        </Container>
    );
};

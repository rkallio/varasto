import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../components/form-components.jsx';
import { actions as modalActions } from './modal.redux.js';

export default CloseModalButton = (props) => {
    const { children, ...rest } = props;
    const dispatch = useDispatch();
    const closeModal = () => dispatch(modalActions.closeModal());
    return (
        <Button type="button" onClick={closeModal}>
            {children ? children : 'Close Modal'}
        </Button>
    );
};

import React from 'react';
import ReactModal from 'react-modal';

import Container from '../components/container.jsx';
import { useSelector } from 'react-redux';
import { modalSelector } from './modal.redux.js';

import { AddItemForm, EditItemForm } from '../items/item-form.jsx';
import AddTransientForm from '../transients/transient-form.jsx';
import FormPicker from '../components/form-picker.jsx';

ReactModal.setAppElement('#root');

const ModalSelector = () => {
    const state = useSelector(modalSelector);
    if (state.type === 'create-item') {
        return <AddItemForm />;
    } else if (state.type === 'create-transient') {
        return <AddTransientForm />;
    } else if (state.type === 'edit-item') {
        return <EditItemForm id={state.props.id} />;
    } else if (state.type === 'form-picker') {
        return <FormPicker />;
    } else {
        return null;
    }
};

export default Modal = () => {
    const state = useSelector(modalSelector);
    const parentSelector = () => {
        return document.querySelector('#root');
    };

    return (
        <ReactModal
            parentSelector={parentSelector}
            isOpen={state.type !== undefined}
        >
            <Container>
                <ModalSelector />
            </Container>
        </ReactModal>
    );
};

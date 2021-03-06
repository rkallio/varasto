import React from 'react';
import ReactModal from 'react-modal';

import Container from '../components/container.jsx';
import { useSelector } from 'react-redux';
import * as modal from './modal.redux.js';

import { AddItemForm, EditItemForm } from '../items/item-form.jsx';
import AddTransientForm from '../transients/transient-form.jsx';
import FormPicker from './form-picker.jsx';

ReactModal.setAppElement('#root');

const ModalSelector = () => {
    const state = useSelector(modal.modalSelector);
    if (state.type === modal.CREATE_ITEM) {
        return <AddItemForm />;
    } else if (state.type === modal.CREATE_TRANSIENT) {
        return <AddTransientForm />;
    } else if (state.type === modal.EDIT_ITEM) {
        return <EditItemForm id={state.props.id} />;
    } else if (state.type === modal.FORM_PICKER) {
        return <FormPicker />;
    } else {
        return null;
    }
};

const Modal = () => {
    const state = useSelector(modal.modalSelector);
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

export default Modal;

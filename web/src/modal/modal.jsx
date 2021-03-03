import React from 'react';
import ReactModal from 'react-modal';

import { useSelector } from 'react-redux';
import { modalSelector } from '../modal.redux.js';

import { AddItemForm, EditItemForm } from '../items/item-form.jsx';

ReactModal.setAppElement('#root');

const ModalSelector = () => {
    const state = useSelector(modalSelector);
    if (state.type === 'create-item') {
        return <AddItem />;
    } else if (state.type === 'edit-item') {
        return <EditItem id={state.props.id} />;
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
            <ModalSelector />
        </ReactModal>
    );
};

import React from 'react';
import ReactModal from 'react-modal';

import { useSelector } from 'react-redux';
import { modalSelector } from './modal.redux.js';

import AddItem from './add-item.jsx';
import EditItem from './edit-item.jsx';

ReactModal.setAppElement('#root');

const ModalSelector = () => {
    const state = useSelector(modalSelector);
    if(state.open && state.mode === 'create-item') {
        return (<AddItem />);
    } else if(state.open && state.mode === 'edit-item') {
        return (<EditItem />);
    } else {
        return null;
    }
}

export default Modal = () => {
    const state = useSelector(modalSelector);
    let element;
    const parentSelector = () => document.querySelector('#root');

    return (
        <ReactModal parentSelector={parentSelector} isOpen={state.open}>
            <ModalSelector />
        </ReactModal>
    );
}

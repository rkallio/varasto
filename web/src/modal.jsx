import React from 'react';
import ReactModal from 'react-modal';

import { useSelector } from 'react-redux';
import { modalSelector } from './modal.redux.js';

import AddItem from './add-item.jsx';
import EditItem from './edit-item.jsx';

ReactModal.setAppElement('#root');

export default Modal = () => {
    const state = useSelector(modalSelector);
    let element;
    const parentSelector = () => document.querySelector('#root');

    if(state.mode === 'create-item') {
        element = (<AddItem />);
    } else if(state.mode ==='edit-item') {
        element = (<EditItem />);
    } else {
        element = null;
    }

    return (
            <ReactModal
                parentSelector={parentSelector}
                isOpen={state.open}>
                { element }
            </ReactModal>
    );
}

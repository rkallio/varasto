import React from 'react';
import { actions } from './modal.redux.js';
import { useDispatch } from 'react-redux';
import * as css from './add-button.module.css';

export default () => {
    const dispatch = useDispatch();

    const openAddItemModal = () => dispatch(actions.addItem());

    return (
        <button
            className={css.addButton}
            onClick={openAddItemModal}
        >
            +
        </button>
    );
}

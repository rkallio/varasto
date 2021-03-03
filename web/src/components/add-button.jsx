import React from 'react';
import { useDispatch } from 'react-redux';
import * as css from './add-button.module.css';
import { actions } from '../modal.redux.js';

export default (props) => {
    const dispatch = useDispatch();
    const onClick = () => dispatch(actions.addItem());

    return (
        <button className={css.addButton} onClick={onClick}>
            +
        </button>
    );
};

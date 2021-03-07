import React from 'react';
import { useDispatch } from 'react-redux';
import * as css from './add-button.module.css';
import { actions } from '../modal/modal.redux.js';

const AddButton = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(actions.formPicker());

  return (
    <button className={css.addButton} onClick={onClick}>
      +
    </button>
  );
};

export default AddButton;

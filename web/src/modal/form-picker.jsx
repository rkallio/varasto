import React from 'react';
import * as Forms from '../components/form-components.jsx';
import { useDispatch } from 'react-redux';
import { actions as modal } from './modal.redux.js';
import CloseModalButton from './close-modal-button.jsx';

const FormPicker = () => {
  const dispatch = useDispatch();
  return (
    <Forms.ButtonGroup>
      <Forms.Button
        type="button"
        onClick={() => dispatch(modal.addItem())}
      >
        Add Permanent Item
      </Forms.Button>
      <Forms.Button
        type="button"
        onClick={() => dispatch(modal.addTransient())}
      >
        Add Transient Item
      </Forms.Button>
      <CloseModalButton />
    </Forms.ButtonGroup>
  );
};

export default FormPicker;

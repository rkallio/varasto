import React from 'react';
import * as Forms from '../components/form-components.jsx';
import * as Buttons from './modal-buttons.jsx';

const FormPicker = () => {
  return (
    <Forms.ButtonGroup>
      <Buttons.ShowItemFormButton />
      <Buttons.ShowTransientFormButton />
      <Buttons.CloseModalButton>Cancel</Buttons.CloseModalButton>
    </Forms.ButtonGroup>
  );
};

export default FormPicker;

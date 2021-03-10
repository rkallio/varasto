import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Transients from './transient-components.jsx';
import * as Forms from '../components/form-components.jsx';
import { create } from './transient.redux.js';
import useTransientForm from './use-transient-form.js';
import CloseModalButton from '../modal/close-modal-button.jsx';

export const TransientForm = (props) => {
  const { actionButtons } = props;

  const dispatch = useDispatch();
  const dispatcher = (values) => dispatch(create(values));

  const { values, handleChange, onSubmit } = useTransientForm({
    defaults: {},
    dispatcher,
  });

  return (
    <form onSubmit={onSubmit}>
      <Transients.NameInput
        value={values.name}
        onChange={handleChange}
        required
      />
      <Transients.CompletedInput
        value={values.completed}
        onChange={handleChange}
      />
      <Forms.ButtonGroup>
        <Forms.Button primary key="submit" type="submit">
          Submit
        </Forms.Button>
        {actionButtons ? actionButtons : null}
      </Forms.ButtonGroup>
    </form>
  );
};

TransientForm.propTypes = {
  actionButtons: PropTypes.arrayOf(PropTypes.node),
};

const AddTransientFormModal = () => {
  return (
    <TransientForm
      actionButtons={[<CloseModalButton key="close-modal" />]}
    />
  );
};

export default AddTransientFormModal;

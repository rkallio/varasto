import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Transients from './transient-components.jsx';
import * as Forms from '../components/form-components.jsx';
import { create } from './transient.redux.js';
import useTransientForm from './use-transient-form.js';
import { PopModalButton } from '../modal/modal-buttons.jsx';

export const TransientForm = (props) => {
  const { actionButtons } = props;

  const dispatch = useDispatch();
  const dispatcher = (values) => dispatch(create(values));

  const { values, handleChange, onSubmit } = useTransientForm({
    defaults: {},
    dispatcher,
  });

  return (
    <Forms.Form onSubmit={onSubmit}>
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
    </Forms.Form>
  );
};

TransientForm.propTypes = {
  actionButtons: PropTypes.node,
};

const AddTransientFormModal = () => {
  return (
    <TransientForm
      actionButtons={<PopModalButton>Cancel</PopModalButton>}
    />
  );
};

export default AddTransientFormModal;

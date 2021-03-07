import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '../components/form-components.jsx';
import { actions as modalActions } from './modal.redux.js';

const CloseModalButton = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const closeModal = () => dispatch(modalActions.closeModal());
  return (
    <Button type="button" onClick={closeModal}>
      {children ? children : 'Close Modal'}
    </Button>
  );
};

CloseModalButton.propTypes = {
  children: PropTypes.node,
};

export default CloseModalButton;

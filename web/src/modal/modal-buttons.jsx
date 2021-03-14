import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { useDispatch } from 'react-redux';

import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';

import { actions, payloadCreators } from './modal.redux.js';
import { Button } from '../components/form-components.jsx';

const ModalButton = styled(Button).attrs(() => ({
  type: 'button',
}))``;

export const ShowItemFormButton = () => {
  const dispatch = useDispatch();
  return (
    <ModalButton
      onClick={() =>
        dispatch(actions.push(payloadCreators.newItem()))
      }
      data-testid="show-item-form-button"
    >
      New Item
    </ModalButton>
  );
};

export const ShowTransientFormButton = () => {
  const dispatch = useDispatch();
  return (
    <ModalButton
      onClick={() =>
        dispatch(actions.push(payloadCreators.newTransient()))
      }
      data-testid="show-transient-form-button"
    >
      New Transient
    </ModalButton>
  );
};

export const CloseModalButton = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  return (
    <ModalButton onClick={() => dispatch(actions.clear())}>
      {children}
    </ModalButton>
  );
};

CloseModalButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export const PopModalButton = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  return (
    <ModalButton onClick={() => dispatch(actions.pop())}>
      {children}
    </ModalButton>
  );
};

PopModalButton.propTypes = {
  children: PropTypes.string.isRequired,
};

const OpenModalButtonComponent = styled(Button)`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 10px;
  right: 10px;
`;

export const OpenModalButton = () => {
  const dispatch = useDispatch();
  const onClick = () =>
    dispatch(actions.push(payloadCreators.formPicker()));
  return (
    <OpenModalButtonComponent
      data-testid="open-modal-button"
      onClick={onClick}
    >
      <Icon path={mdiDotsVertical} title="More" size={1} />
    </OpenModalButtonComponent>
  );
};

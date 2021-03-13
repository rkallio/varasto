import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import { Button } from '../components/form-components.jsx';
import { actions } from './modal.redux.js';
import styled from 'styled-components';

const ModalButton = styled(Button).attrs(() => ({
  type: 'button',
}))``;

export const ShowItemFormButton = () => {
  const dispatch = useDispatch();
  return (
    <ModalButton
      onClick={() => dispatch(actions.push(actions.newItemForm()))}
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
        dispatch(actions.push(actions.newTransientForm()))
      }
    >
      New Transient
    </ModalButton>
  );
};

export const CloseModalButton = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  return (
    <ModalButton onClick={() => dispatch(actions.pop())}>
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
  children: PropTypes.node.isRequired,
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
  const onClick = () => dispatch(actions.push(actions.formPicker()));
  return (
    <OpenModalButtonComponent
      data-testid="add-button"
      onClick={onClick}
    >
      <Icon path={mdiDotsVertical} title="More" size={1} />
    </OpenModalButtonComponent>
  );
};

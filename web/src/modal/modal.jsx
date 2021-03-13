import React from 'react';
import ReactModal from 'react-modal';

import Container from '../components/container.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from './modal.redux.js';

import { AddItemForm, EditItemForm } from '../items/item-form.jsx';
import AddTransientForm from '../transients/transient-form.jsx';
import FormPicker from './form-picker.jsx';
import If from '../components/if.jsx';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import styled from 'styled-components';

ReactModal.setAppElement('#root');

const modalMap = {
  [actions.formPicker]: FormPicker,
  [actions.newItemForm]: AddItemForm,
  [actions.newTransientForm]: AddTransientForm,
  [actions.editItemForm]: EditItemForm,
};

const ModalSelector = () => {
  const current = useSelector(selectors.activeModal);

  if (!current) {
    return null;
  }

  const Component = modalMap[current.type];

  return (
    <If cond={Component}>
      <Component {...current.payload} />
    </If>
  );
};

const Modal = () => {
  const isOpen = useSelector(selectors.modalShouldRender);

  const dispatch = useDispatch();
  const parentSelector = () => {
    return document.querySelector('#root');
  };

  return (
    <ReactModal
      style={{
        content: {
          borderRadius: '6px',
          borderColor: 'black',
        },
      }}
      parentSelector={parentSelector}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => dispatch(actions.clear())}
      isOpen={isOpen}
    >
      <Container>
        <CloseModalButton />
        <ModalSelector />
      </Container>
    </ReactModal>
  );
};

const ModalControlButton = styled(Icon)`
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 6px;
  background: white;

  &:hover {
    background: black;
    color: white;
  }

  &:active {
    background: white;
    color: black;
  }
`;

const CloseModalButton = () => {
  const dispatch = useDispatch();
  return (
    <ModalControlButton
      path={mdiClose}
      size={1.0}
      onClick={() => dispatch(actions.clear())}
    />
  );
};

export default Modal;

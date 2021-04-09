import React from 'react';
import ReactModal from 'react-modal';

import Container from '../components/container.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions, types } from './modal.redux.js';

import { AddItemForm, EditItemForm } from '../items/item-form.jsx';
import AddTransientForm from '../transients/transient-form.jsx';
import FormPicker from './form-picker.jsx';
import If from '../components/if.jsx';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import styled, { createGlobalStyle } from 'styled-components';

const ModalStyle = createGlobalStyle`
.ReactModal__Overlay {
  opacity: 0;
  transform: translateX(20px);
  transition: all 250ms ease-in-out;
}

.ReactModal__Overlay--after-open {
  opacity: 1;
  transform: translateX(0px);
}

.ReactModal__Overlay--before-close {
  opacity: 0;
  transform: translateX(-20px);
}
`;

ReactModal.setAppElement('#root');

const modalMap = {
  [types.FORM_PICKER]: FormPicker,
  [types.NEW_ITEM_FORM]: AddItemForm,
  [types.NEW_TRANSIENT_FORM]: AddTransientForm,
  [types.EDIT_ITEM_FORM]: EditItemForm,
};

const ModalSelector = () => {
  const current = useSelector(selectors.activeModal);

  if (!current) {
    return null;
  }

  const Component = modalMap[current.type];

  return (
    <If cond={Component}>
      <Component {...current.props} />
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
    <>
      <ModalStyle />
      <ReactModal
        style={{
          content: {
            borderRadius: '6px',
            borderColor: 'black',
          },
          overlay: {
            zIndex: 1,
          },
        }}
        closeTimeoutMS={250}
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
    </>
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

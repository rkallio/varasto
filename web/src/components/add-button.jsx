import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from './form-components.jsx';
import { actions } from '../modal/modal.redux.js';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';

const AddButtonComponent = styled(Button)`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 10px;
  right: 10px;
`;

const AddButtonContainer = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(actions.formPicker());
  return (
    <AddButtonComponent data-testid="add-button" onClick={onClick}>
      <Icon path={mdiDotsVertical} title="More" size={1} />
    </AddButtonComponent>
  );
};

export default AddButtonContainer;

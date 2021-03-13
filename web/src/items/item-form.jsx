import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  postItem,
  patchItem,
  deleteItem,
  itemSelector,
} from './item.redux.js';
import { Button } from '../components/form-components.jsx';
import PropTypes from 'prop-types';
import If from '../components/if.jsx';
import useItemForm from './use-item-form.js';

import * as Items from './item-components.jsx';
import * as Forms from '../components/form-components.jsx';
import { PopModalButton } from '../modal/modal-buttons.jsx';

const ItemForm = (props) => {
  const item = useSelector((state) =>
    itemSelector.selectById(state, props.id)
  );

  const { values, handleChange, onSubmit } = useItemForm({
    defaults: item,
    dispatcher: props.dispatcher,
  });

  return (
    <Forms.Form onSubmit={onSubmit}>
      <Items.NameInput
        value={values.name}
        onChange={handleChange}
        required
      />
      <Items.LocationInput
        value={values.location}
        onChange={handleChange}
        required
      />
      <Items.MeasureInput
        value={values.measure}
        onChange={handleChange}
      />
      <Items.CurrentQuantityInput
        value={values.currentQuantity}
        onChange={handleChange}
        required
      />
      <If cond={values.measure !== '%'}>
        <Items.TargetQuantityInput
          value={values.targetQuantity}
          onChange={handleChange}
          required
        />
      </If>
      <Forms.ButtonGroup>
        <Forms.Button type="submit" primary>
          Submit
        </Forms.Button>
        {props.actionButtons}
      </Forms.ButtonGroup>
    </Forms.Form>
  );
};

ItemForm.propTypes = {
  id: PropTypes.number,
  dispatcher: PropTypes.func.isRequired,
  actionButtons: PropTypes.node,
};

export default ItemForm;

export const AddItemForm = () => {
  const dispatch = useDispatch();
  const dispatcher = (values) => dispatch(postItem(values));

  return (
    <ItemForm
      dispatcher={dispatcher}
      actionButtons={<PopModalButton>Cancel</PopModalButton>}
    />
  );
};

const DeleteItemButtonComponent = styled(Button).attrs(() => ({
  type: 'button',
  children: 'Delete',
}))`
border-color: red;
color: red;
font-weight: 700;

&:hover {
color: white;
background: red;

&:active {
color: orangered;
background: white;
}`;

const DeleteItemButton = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  return (
    <DeleteItemButtonComponent
      onClick={() => dispatch(deleteItem(id))}
    />
  );
};

DeleteItemButton.propTypes = {
  id: PropTypes.number.isRequired,
};

export const EditItemForm = ({ id }) => {
  const dispatch = useDispatch();

  const dispatcher = (values) => {
    return dispatch(patchItem({ id: id, data: values }));
  };

  return (
    <ItemForm
      id={id}
      dispatcher={dispatcher}
      actionButtons={
        <>
          <DeleteItemButton key="delete-button" id={id} />
          <PopModalButton key="pop-button">Cancel</PopModalButton>,
        </>
      }
    />
  );
};

EditItemForm.propTypes = {
  id: PropTypes.number.isRequired,
};

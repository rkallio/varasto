import { createSlice, createSelector } from '@reduxjs/toolkit';

import {
  postItem,
  patchItem,
  deleteItem,
} from '../items/item.redux.js';

import { create as createTransient } from '../transients/transient.redux.js';

export const types = {
  FORM_PICKER: 'form-picker',
  NEW_ITEM_FORM: 'new-item-form',
  EDIT_ITEM_FORM: 'edit-item-form',
  NEW_TRANSIENT_FORM: 'new-transient-form',
};

export const payloadCreators = {
  formPicker: () => ({
    type: types.FORM_PICKER,
  }),
  newItem: () => ({
    type: types.NEW_ITEM_FORM,
  }),
  editItem: (id) => ({
    type: types.EDIT_ITEM_FORM,
    props: { id },
  }),
  newTransient: () => ({
    type: types.NEW_TRANSIENT_FORM,
  }),
};

const push = (state, action) => {
  state.push(action.payload);
};
const pop = (state, _action) => {
  state.pop();
};
const clear = (state, _action) => {
  state.length = 0;
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: [],
  reducers: {
    push,
    pop,
    clear,
  },
  extraReducers: {
    [postItem.fulfilled]: clear,
    [patchItem.fulfilled]: clear,
    [deleteItem.fulfilled]: clear,
    [createTransient.fulfilled]: clear,
  },
});

export default modalSlice;

const selector = (state) => state.modal;
const modalShouldRender = createSelector(
  selector,
  (state) => state.length > 0
);
const activeModal = createSelector(
  selector,
  (state) => state[state.length - 1]
);

export const selectors = {
  selector,
  modalShouldRender,
  activeModal,
};

export const actions = modalSlice.actions;

import {
  createSlice,
  createSelector,
  createAction,
} from '@reduxjs/toolkit';

import {
  postItem,
  patchItem,
  deleteItem,
} from '../items/item.redux.js';

import { create as createTransient } from '../transients/transient.redux.js';

const formPicker = createAction('modal/form-picker');
const newItemForm = createAction('modal/add-new-item');
const editItemForm = createAction('modal/edit-item', (id) => {
  return {
    payload: { id },
  };
});

const newTransientForm = createAction('modal/add-new-transient');

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

export const actions = {
  ...modalSlice.actions,
  formPicker,
  newItemForm,
  newTransientForm,
  editItemForm,
};

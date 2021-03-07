import { createSlice } from '@reduxjs/toolkit';

import {
  actions as itemActions,
  postItem,
  patchItem,
  deleteItem,
} from '../items/item.redux.js';

import { create as createTransient } from '../transients/transient.redux.js';

const initialState = {
  type: undefined,
  props: {},
};

const closeModal = (_state, _action) => {
  return initialState;
};

export const FORM_PICKER = 'FORM-PICKER';
export const CREATE_TRANSIENT = 'CREATE-TRANSIENT';
export const CREATE_ITEM = 'CREATE-ITEM';
export const EDIT_ITEM = 'EDIT-ITEM';

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    formPicker(state, _action) {
      state.type = FORM_PICKER;
      state.props = {};
    },
    addTransient(state, _action) {
      state.type = CREATE_TRANSIENT;
      state.props = {};
    },
    addItem(state, _action) {
      state.type = CREATE_ITEM;
      state.props = {};
    },
    editItem(state, action) {
      state.type = EDIT_ITEM;
      state.props = { id: action.payload };
    },
    closeModal,
  },
  extraReducers: {
    [postItem.fulfilled]: closeModal,
    [patchItem.fulfilled]: closeModal,
    [deleteItem.fulfilled]: closeModal,
    [createTransient.fulfilled]: closeModal,
    [itemActions.removeOne]: (state, action) => {
      if (
        state.type === EDIT_ITEM &&
        state.props.id === action.payload
      ) {
        return initialState;
      }
    },
  },
});

export default modalSlice;

export const modalSelector = (state) => state.modal;
export const actions = modalSlice.actions;

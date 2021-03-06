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

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        formPicker(state, _action) {
            state.type = 'form-picker';
            state.props = {};
        },
        addTransient(state, _action) {
            state.type = 'create-transient';
            state.props = {};
        },
        addItem(state, _action) {
            state.type = 'create-item';
            state.props = {};
        },
        editItem(state, action) {
            state.type = 'edit-item';
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
                state.type === 'edit-item' &&
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

import { createSlice } from '@reduxjs/toolkit';

import {
    actions as itemActions,
    postItem,
    patchItem,
    deleteItem,
} from './item.redux.js';

const initialState = {
    type: undefined,
    props: {},
};

const closeModal = (state, action) => {
    return initialState;
};
export default modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addItem(state, action) {
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

export const modalSelector = (state) => state.modal;
export const actions = modalSlice.actions;

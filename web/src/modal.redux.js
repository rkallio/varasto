import {
    createSlice
} from '@reduxjs/toolkit';

import { deleteItem } from './item.redux.js';

export default modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false, mode: undefined },
    reducers: {
        addItem(state, action) {
            state.open = true;
            state.mode = 'create-item';
        },

        closeModal(state, action) {
            state.open = false;
        },

        editItem(state, action) {
            state.open = true;
            state.mode = 'edit-item';
            state.id = action.payload;
        }
    },
    extraReducers: {
        [deleteItem.fulfilled]: (state, action) => {
            if(state.open && state.mode === 'edit-item') {
                state.open = false;
                state.mode = undefined;
            }
        }
    }
});

export const modalSelector = state => state.modal;
export const actions = modalSlice.actions;

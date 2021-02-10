import {
    createSlice
} from '@reduxjs/toolkit';

export default modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false, mode: 'create-item' },
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
    }
});

export const modalSelector = state => state.modal;
export const actions = modalSlice.actions;

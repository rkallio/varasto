import React from 'react';
import * as Forms from '../components/form-components.jsx';
import { useDispatch } from 'react-redux';
import { actions as modal } from './modal.redux.js';

export default FormPicker = (props) => {
    const dispatch = useDispatch();
    return (
        <Forms.FieldContainer>
            <Forms.ButtonGroup>
                <Forms.Button
                    type="button"
                    onClick={() => dispatch(modal.addItem())}
                >
                    Add Permanen Item
                </Forms.Button>
                <Forms.Button
                    type="button"
                    onClick={() => dispatch(modal.addTransient())}
                >
                    Add Transient Item
                </Forms.Button>
            </Forms.ButtonGroup>
        </Forms.FieldContainer>
    );
};

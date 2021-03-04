import React from 'react';
import { useDispatch } from 'react-redux';
import * as Transients from './transient-components.jsx';
import * as Forms from '../components/form-components.jsx';
import { create } from './transient.redux.js';
import useTransientForm from './use-transient-form.js';
import CloseModalButton from '../modal/close-modal-button.jsx';

export const TransientForm = (props) => {
    const { actionButtons, ...rest } = props;

    const dispatch = useDispatch();
    const dispatcher = (values) => dispatch(create(values));

    const { values, handleChange, onSubmit } = useTransientForm({
        defaults: {},
        dispatcher,
    });

    return (
        <form onSubmit={onSubmit}>
            <Transients.NameInput
                value={values.name}
                onChange={handleChange}
                required
            />
            <Transients.CompletedInput
                value={values.completed}
                onChange={handleChange}
            />
            <Forms.FieldContainer>
                <Forms.ButtonGroup>
                    <Forms.Button key="submit" type="submit">
                        Submit
                    </Forms.Button>
                    {actionButtons ? actionButtons : null}
                </Forms.ButtonGroup>
            </Forms.FieldContainer>
        </form>
    );
};

export default AddTransientFormModal = (props) => {
    return (
        <TransientForm
            actionButtons={[<CloseModalButton key="close-modal" />]}
        />
    );
};

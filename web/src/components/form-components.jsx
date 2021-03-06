import React from 'react';
import PropTypes from 'prop-types';
import * as css from './form-components.module.css';

const appendAsteriskIf = (text, cond) => {
    if (cond) {
        return text + '*';
    } else {
        return text;
    }
};

export const FieldContainer = (props) => {
    const { children, ...rest } = props;
    return (
        <div className={css.fieldContainer} {...rest}>
            {children}
        </div>
    );
};

FieldContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export const Input = (props) => {
    return <input {...props} className={css.input} />;
};

export const Select = (props) => {
    const { children, ...rest } = props;
    return (
        <select {...rest} className={css.select}>
            {children}
        </select>
    );
};

Select.propTypes = {
    // Create and use an Option element
    children: PropTypes.node.isRequired,
};

export const Checkbox = (props) => {
    const rest = Object.assign({}, props, { children: null });
    return (
        <input {...rest} type="checkbox" className={css.checkbox} />
    );
};

export const LabeledCheckbox = (props) => {
    const { label, name, required, ...rest } = props;
    return (
        <FieldContainer>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <Checkbox {...rest} name={name} required={required} />
        </FieldContainer>
    );
};

LabeledCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    // use an Option element here as well
    children: PropTypes.node.isRequired,
};

export const Label = (props) => {
    const { children, required, ...rest } = props;
    return (
        <label {...rest} className={css.label}>
            {appendAsteriskIf(children, required)}
        </label>
    );
};

Label.propTypes = {
    children: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export const LabeledInput = (props) => {
    const { label, name, required, ...rest } = props;

    return (
        <FieldContainer>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <Input name={name} required={required} {...rest} />
        </FieldContainer>
    );
};

LabeledInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export const LabeledSelect = (props) => {
    const { label, name, required, ...rest } = props;
    return (
        <FieldContainer>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <Select required={required} name={name} {...rest} />
        </FieldContainer>
    );
};

LabeledSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    // use an Option element here as well
    children: PropTypes.node.isRequired,
};

export const Button = (props) => {
    const { children, ...rest } = props;
    return (
        <button className={css.button} {...rest}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
};

export const ButtonGroup = ({ children }) => {
    return <div className={css.buttonGroup}>{children}</div>;
};

ButtonGroup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
    ]).isRequired,
};

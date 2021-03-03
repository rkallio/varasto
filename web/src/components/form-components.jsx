import React from 'react';
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

export const Checkbox = (props) => {
    return (
        <input {...props} type="checkbox" className={css.checkbox} />
    );
};

export const LabeledCheckbox = (props) => {
    const { label, name, ...rest } = props;
    return (
        <FieldContainer>
            <Label htmlFor={name}>{label}</Label>
            <Checkbox {...rest} name={name} />
        </FieldContainer>
    );
};

export const Label = (props) => {
    const { children, required, ...rest } = props;
    return (
        <label {...props} className={css.label}>
            {appendAsteriskIf(children, required)}
        </label>
    );
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

export const LabeledSelect = (props) => {
    const { label, required, ...rest } = props;
    return (
        <FieldContainer>
            <Label htmlFor={rest.name} required={required}>
                {label}
            </Label>
            <Select required={required} {...rest} />
        </FieldContainer>
    );
};

export const Button = (props) => {
    const { children, ...rest } = props;
    return (
        <button className={css.button} {...rest}>
            {children}
        </button>
    );
};

export const ButtonGroup = (props) => {
    return <div className={css.buttonGroup}>{props.children}</div>;
};

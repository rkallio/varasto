import React, {forwardRef} from 'react';
import * as css from './forms.module.css';

const appendAsteriskIf = (text, cond) => {
    if(cond) {
        return text + '*';
    } else {
        return text;
    }
}

export const FieldContainer = (props) => {
    return (
        <div className={css.fieldContainer}>
             { props.children }
        </div>
    )
}

export const Input = forwardRef((props, ref) => {
    return (
        <input
            ref={ref}
            {...props}
            className={css.input}
        />
    );
})

export const Select = forwardRef((props, ref) => {
    const { children, ...rest } = props;
    return (
        <select
            ref={ref}
            {...rest}
            className={css.select}
            >
            {children}
        </select>
    );
});

export const Label = forwardRef((props, ref) => {
    return (
        <label ref={ref} {...props} className={css.label}>
            {
                props.children
            }
        </label>
    )
})

export const LabeledInput = forwardRef((props, ref) => {
    const { label, ...rest } = props;

    return (
        <FieldContainer>
            <Label className={css.label} htmlFor={rest.name}>
                {
                    appendAsteriskIf(label, props.required)
                }
            </Label>
            <Input ref={ref} {...rest} />
        </FieldContainer>
    )
});

export const LabeledSelect = forwardRef((props, ref) => {
    const { label, ...rest } = props;
    return (
        <FieldContainer>
            <Label className={css.label} htmlFor={rest.name}>
                {
                    appendAsteriskIf(label, props.required)
                }
            </Label>
            <Select ref={ref} {...rest} />
        </FieldContainer>
    )
});

export const Button = forwardRef((props, ref) => {
    const { children, ...rest } = props;
    return (
        <button className={css.button} ref={ref} {...rest}>
            { children }
        </button>
    );
});

export const ButtonGroup = props => {
    return (
        <div className={css.buttonGroup}>
            {
                 props.children
             }
        </div>
    );
}

import React, { forwardRef } from 'react';
import { LabeledInput } from './forms.jsx';

export const NameInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="name"
            ref={ref}
            label="Name"
            {...props}
        />
    );
});

export const LocationInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="location"
            ref={ref}
            label="Location"
            {...props}
        />
    );
});

export const CurrentQuantityInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="currentQuantity"
            ref={ref}
            label="Current Quantity"
            type="number"
            min="0"
            {...props}
        />
    );
});

export const TargetQuantityInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="targetQuantity"
            ref={ref}
            label="Target Quantity"
            type="number"
            min="0"
            {...props}
        />
    );
});

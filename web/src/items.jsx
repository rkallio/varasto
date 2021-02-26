import React, { forwardRef } from 'react';
import { LabeledInput, LabeledSelect } from './forms.jsx';

export const NameInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="name"
            ref={ref}
            label="Name"
            placeholder="Milk"
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
            placeholder="Fridge"
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
            step="any"
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
            step="any"
            {...props}
        />
    );
});

export const MeasureInput = forwardRef((props, ref) => {
    return (
        <LabeledSelect
            name="measure"
            ref={ref}
            label="Measure"
            {...props}
        >
            <option value="mass">Mass (kg)</option>
            <option value="volume">Volume (litres)</option>
            <option value="pcs">Pieces</option>
            <option value="%">Percentage (%)</option>
        </LabeledSelect>
    );
});

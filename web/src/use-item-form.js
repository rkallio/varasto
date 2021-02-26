import { useState } from 'react';

export default useItemForm = ({ defaults, dispatcher }) => {
    const [name, setName] = useState(
        defaults && defaults.name ? defaults.name : ''
    );
    const [location, setLocation] = useState(
        defaults && defaults.location ? defaults.location : ''
    );
    const [currentQuantity, setCurrentQuantity] = useState(
        defaults && defaults.currentQuantity
            ? defaults.currentQuantity
            : 0
    );
    const [targetQuantity, setTargetQuantity] = useState(
        defaults && defaults.targetQuantity
            ? defaults.targetQuantity
            : 0
    );
    const [measure, setMeasure] = useState(
        defaults && defaults.measure ? defaults.measure : 'mass'
    );

    const values = {
        name,
        location,
        currentQuantity,
        targetQuantity,
        measure,
    };

    const setters = {
        name: setName,
        location: setLocation,
        currentQuantity: setCurrentQuantity,
        targetQuantity: setTargetQuantity,
        measure: setMeasure,
    };

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        if (field === 'measure' && value === '%') {
            setTargetQuantity(100);
        }
        setters[field](value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatcher(values);
    };

    return { values, handleChange, onSubmit };
};

import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default useItemForm = (defaults, method) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(
        defaults.name ? defaults.name : ''
    );
    const [location, setLocation] = useState(
        defaults.location ? defaults.location : ''
    );
    const [currentQuantity, setCurrentQuantity] = useState(
        defaults.currentQuantity ? defaults.currentQuantity : 0
    );
    const [targetQuantity, setTargetQuantity] = useState(
        defaults.targetQuantity ? defaults.targetQuantity : 0
    );
    const [measure, setMeasure] = useState(
        defaults.measure ? defaults.measure : 'kg'
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
        dispatch(method(values));
    };

    return { values, handleChange, onSubmit };
};

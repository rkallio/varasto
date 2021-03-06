import { useState } from 'react';

const useTransientForm = ({ defaults, dispatcher }) => {
    const [name, setName] = useState(
        defaults && defaults.name ? defaults.name : ''
    );
    const [completed, setCompleted] = useState(
        defaults && defaults.completed ? defaults.completed : false
    );
    const values = {
        name,
        completed,
    };
    const setters = {
        name: setName,
        completed: setCompleted,
    };
    const handleChange = (event) => {
        const type = event.target.type;
        const field = event.target.name;
        const value = event.target.value;

        if (type === 'checkbox') {
            console.log(event.target.checked);
            setters[field](event.target.checked);
            return;
        }
        setters[field](value);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        dispatcher(values);
    };

    return { values, handleChange, onSubmit };
};

export default useTransientForm;

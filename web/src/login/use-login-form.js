import { useState } from 'react';

const useLoginForm = ({ defaults, dispatcher }) => {
    const [name, setName] = useState(
        defaults && defaults.name ? defaults.name : ''
    );
    const [password, setPassword] = useState(
        defaults && defaults.password ? defaults.password : ''
    );

    const values = {
        name,
        password,
    };
    const setters = { name: setName, password: setPassword };

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setters[field](value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatcher(values);
    };

    return { values, handleChange, onSubmit };
};

export default useLoginForm;

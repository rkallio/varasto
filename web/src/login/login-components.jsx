import React from 'react';
import { LabeledInput } from '../components/form-components.jsx';

export const UsernameInput = (props) => {
  return <LabeledInput name="name" label="Name" {...props} />;
};

export const PasswordInput = (props) => {
  return (
    <LabeledInput
      name="password"
      label="Password"
      type="password"
      {...props}
    />
  );
};

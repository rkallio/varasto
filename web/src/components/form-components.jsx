import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const appendAsteriskIf = (text, cond) => {
  if (cond) {
    return text + '*';
  } else {
    return text;
  }
};

export const Form = styled.form`
  margin-top: -5px;
  display: flex;
  flex-flow: column nowrap;
  align-content: flex-start;
`;

const FieldContainer = styled.div`
  padding: 5px 0;
  display: flex;
  flex-flow: column nowrap;
`;

export const Input = styled.input`
color: black;
border-radius: 6px;
border: 1px solid black;
background: white;
padding: 10px;

&:focus {
  outline: none;
  border-style dashed;
}`;

export const Select = styled.select`
color: black;
border-radius: 6px;
border: 1px solid black;
background: white;
padding: 10px;

&:focus {
  outline: none;
  border-style dashed;
}`;

export const Checkbox = styled.input.attrs(() => ({
  type: 'checkbox',
  children: undefined,
}))``;

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

export const Label = styled.label.attrs((props) => ({
  children: appendAsteriskIf(props.children, props.required),
}))`
  padding-bottom: 5px;
`;

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

export const Button = styled.button`
  color: ${({ primary }) => (primary ? 'white' : 'black')};
  border-radius: 6px;
  border: 1px solid black;
  background: ${({ primary }) => (primary ? 'black' : 'white')};
  padding: 10px;
  margin: 3px;
  flex-grow: 1;
  flex-basis: 0;
  white-space: nowrap;

  &:hover {
    color: ${({ primary }) => (primary ? 'black' : 'white')};
    background: ${({ primary }) => (primary ? 'white' : 'black')};
  }

  &:active {
    color: ${({ primary }) => (primary ? 'white' : 'black')};
    ${({ primary }) => (primary ? 'white' : 'black')};
    background: ${({ primary }) => (primary ? 'black' : 'white')};
  }

  &:focus {
    outline: none;
    border-style: dashed;
  }
`;

export const ButtonGroup = styled(FieldContainer)`
  display: flex;
  flex-flow: row wrap;
  margin: -3px;
`;

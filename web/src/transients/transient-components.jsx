import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCompleted,
  findAll,
  selector as transientSelector,
} from './transient.redux.js';
import styled from 'styled-components';
import Card from '../components/card.jsx';
import {
  LabeledInput,
  LabeledCheckbox,
} from '../components/form-components.jsx';
import GroupList from '../components/grouplist.jsx';

const TransientList = () => {
  const dispatch = useDispatch();
  const total = useSelector(transientSelector.selectTotal);
  const transients = useSelector((state) => {
    const transients = transientSelector.selectAll(state);
    return { Transients: transients };
  });

  useEffect(() => {
    dispatch(findAll());
  }, []);

  if (total === 0) {
    return null;
  }
  return (
    <GroupList
      data={Object.entries(transients)}
      render={(t) => <TransientContainer key={t.id} id={t.id} />}
    />
  );
};

export default TransientList;

const TransientInnerComponent = styled.div`
  margin: auto;
  text-decoration: ${({ completed }) =>
    completed ? 'line-through' : 'initial'};
`;

const TransientComponent = styled(Card)`
cursor: pointer;
user-select: none;
flex-grow: 1;
margin: 3px;

&:hover {
  background: black;
  color: white;
}

&:active {
  background: white;
  color: black;
`;

const TransientContainer = ({ id }) => {
  const tsient = useSelector((state) =>
    transientSelector.selectById(state, id)
  );

  const dispatch = useDispatch();

  const onClick = () => dispatch(toggleCompleted(id));

  return (
    <TransientComponent onClick={onClick}>
      <TransientInnerComponent completed={tsient.completed}>
        {tsient.name}
      </TransientInnerComponent>
    </TransientComponent>
  );
};

TransientContainer.propTypes = {
  id: PropTypes.number.isRequired,
};

export const NameInput = (props) => {
  return (
    <LabeledInput
      name="name"
      label="Name"
      placeholder="Milk"
      {...props}
    />
  );
};

export const CompletedInput = (props) => {
  return (
    <LabeledCheckbox name="completed" label="Completed" {...props}>
      <option value={false}>False</option>
      <option value={true}>True</option>
    </LabeledCheckbox>
  );
};

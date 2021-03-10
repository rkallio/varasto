import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCompleted,
  findAll,
  selector as transientSelector,
} from './transient.redux.js';
import styled from 'styled-components';
import {
  LabeledInput,
  LabeledCheckbox,
} from '../components/form-components.jsx';
import GroupList, { ListElement } from '../components/grouplist.jsx';

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
`;

const TransientComponent = styled(ListElement)`
  text-decoration: ${({ completed }) =>
    completed ? 'line-through' : 'initial'};
  color: ${({ completed }) => (completed ? '#ddd' : 'initial')};
  border-color: ${({ completed }) => (completed ? '#bbb' : 'black')};

  &:hover {
    color: white;
    border-color: black;
  }
`;

const TransientContainer = ({ id }) => {
  const tsient = useSelector((state) =>
    transientSelector.selectById(state, id)
  );

  const dispatch = useDispatch();

  const onClick = () => dispatch(toggleCompleted(id));

  return (
    <TransientComponent
      onClick={onClick}
      completed={tsient.completed}
    >
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

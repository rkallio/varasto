import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCompleted,
  findAll,
  selector as transientSelector,
} from './transient.redux.js';
import * as css from './transient-components.module.css';
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
      render={(t) => <Transient key={t.id} id={t.id} />}
    />
  );
};

export default TransientList;

const Transient = ({ id }) => {
  const tsient = useSelector((state) =>
    transientSelector.selectById(state, id)
  );
  const dispatch = useDispatch();

  const onClick = () => dispatch(toggleCompleted(id));

  if (tsient.completed) {
    return (
      <div className={css.outerTransient} onClick={onClick}>
        <Card>
          <div className={css.innerTransient}>
            <s>{tsient.name}</s>
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <div className={css.outerTransient} onClick={onClick}>
        <Card>
          <div className={css.innerTransient}>
            <span>{tsient.name}</span>
          </div>
        </Card>
      </div>
    );
  }
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

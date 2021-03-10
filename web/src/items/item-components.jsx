import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  LabeledInput,
  LabeledSelect,
} from '../components/form-components.jsx';
import styled from 'styled-components';
import * as math from 'mathjs';
import { useDispatch, useSelector } from 'react-redux';
import { itemSelector, findAllItems } from './item.redux.js';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { actions } from '../modal/modal.redux.js';
import Card from '../components/card.jsx';
import GroupList from '../components/grouplist.jsx';

const ItemList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => {
    const items = itemSelector.selectAll(state);
    return items.reduce((acc, curr) => {
      if (curr.location in acc) {
        acc[curr.location].push(curr);
      } else {
        acc[curr.location] = [curr];
      }
      return acc;
    }, {});
  });

  useEffect(() => {
    dispatch(findAllItems());
  }, []);

  return (
    <GroupList
      data={Object.entries(categories)}
      render={(item) => <ItemContainer key={item.id} id={item.id} />}
    />
  );
};

export default ItemList;

const ItemComponent = styled(Card)`
  user-select: none;
  flex-grow: 1;
  margin: 3px;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
  }

  &:active {
    background: white;
    color: black;
  }
`;

const ItemInnerComponent = styled.div`
  margin: auto;
`;

const ItemContainer = (props) => {
  const { id } = props;
  const item = useSelector((state) =>
    itemSelector.selectById(state, id)
  );
  const dispatch = useDispatch();

  const onClick = () => dispatch(actions.editItem(id));

  return (
    <ItemComponent onClick={onClick}>
      <ItemInnerComponent>
        <TaggedName>{item.name}</TaggedName>
        <TaggedQuantity
          current={item.currentQuantity}
          target={item.targetQuantity}
          measure={item.measure}
        />
      </ItemInnerComponent>
    </ItemComponent>
  );
};

ItemContainer.propTypes = {
  id: PropTypes.number.isRequired,
};

export const TaggedName = ({ children }) => {
  return (
    <Property>
      <PropertyName>Name</PropertyName>
      <Space />
      <Name>{children}</Name>
    </Property>
  );
};

TaggedName.propTypes = {
  children: PropTypes.string.isRequired,
};

const Property = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const PropertyName = styled.div``;

const Space = () => {
  return <span>&nbsp;</span>;
};

export const Name = ({ children }) => {
  return <PropertyValue>{children}</PropertyValue>;
};

Name.propTypes = {
  children: PropTypes.string.isRequired,
};

const PropertyValue = styled.div``;

export const TaggedLocation = ({ children }) => {
  return (
    <Property>
      <PropertyName>Location</PropertyName>
      <Space />
      <Location>{children}</Location>
    </Property>
  );
};

TaggedLocation.propTypes = {
  children: PropTypes.string.isRequired,
};

export const Location = ({ children }) => {
  return <PropertyValue>{children}</PropertyValue>;
};

Location.propTypes = {
  children: PropTypes.string.isRequired,
};

export const TaggedQuantity = ({ current, target, measure }) => {
  return (
    <Property>
      <PropertyName>Quantity</PropertyName>
      <Space />
      <Quantity current={current} target={target} measure={measure} />
    </Property>
  );
};

TaggedQuantity.propTypes = {
  current: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  measure: PropTypes.string.isRequired,
};

const Quantity = ({ current, target, measure }) => {
  return (
    <PropertyValue>
      <CurrentQuantity
        value={current}
        target={target}
        measure={measure}
      />
      <QuantitySeparator />
      <TargetQuantity value={target} measure={measure} />
    </PropertyValue>
  );
};

Quantity.propTypes = {
  current: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  measure: PropTypes.string.isRequired,
};

const computeColor = (current, target) => {
  const color = Math.min(180, (current / target) * 120);
  return `hsl(${color}, 100%, 50%)`;
};

const CurrentQuantity = styled.span.attrs((props) => ({
  children: mapQuantityToString(props.value, props.measure),
}))`
  color: ${({ value, target }) => computeColor(value, target)};
`;

CurrentQuantity.propTypes = {
  value: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  measure: PropTypes.string.isRequired,
};

const QuantitySeparator = styled.span.attrs(() => ({
  children: '/',
}))``;

const TargetQuantity = styled.span.attrs((props) => ({
  children: mapQuantityToString(props.value, props.measure),
}))``;

TargetQuantity.propTypes = {
  value: PropTypes.number.isRequired,
  measure: PropTypes.string.isRequired,
};

export const TaggedLastModified = ({ time }) => {
  return (
    <Property>
      <PropertyName>Last Modified</PropertyName>
      <Space />
      <LastModified time={time} />
    </Property>
  );
};

TaggedLastModified.propTypes = {
  time: PropTypes.string.isRequired,
};

export const LastModified = ({ time }) => {
  return (
    <PropertyValue>
      <Relatime time={time} />
    </PropertyValue>
  );
};

LastModified.propTypes = {
  time: PropTypes.string.isRequired,
};

export const Relatime = ({ time }) => {
  const [formattedTime, setFormattedTime] = useState(timeSince(time));

  useEffect(() => {
    setFormattedTime(timeSince(time));
    const timer = setInterval(() => {
      setFormattedTime(timeSince(time));
    }, 2500);
    return () => {
      return clearInterval(timer);
    };
  }, [time]);

  return <time dateTime={time}>{formattedTime}</time>;
};

Relatime.propTypes = {
  time: PropTypes.string.isRequired,
};

const timeSince = (time) => {
  return formatDistanceToNow(parseISO(time), {
    includeSeconds: true,
    addSuffix: true,
  });
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

export const LocationInput = (props) => {
  return (
    <LabeledInput
      name="location"
      label="Location"
      placeholder="Fridge"
      {...props}
    />
  );
};

export const CurrentQuantityInput = (props) => {
  return (
    <LabeledInput
      name="currentQuantity"
      label="Current Quantity"
      type="number"
      min="0"
      step="any"
      {...props}
    />
  );
};

export const TargetQuantityInput = (props) => {
  return (
    <LabeledInput
      name="targetQuantity"
      label="Target Quantity"
      type="number"
      min="0"
      step="any"
      {...props}
    />
  );
};

export const MeasureInput = (props) => {
  return (
    <LabeledSelect name="measure" label="Measure" {...props}>
      <option value="mass">Mass (kg)</option>
      <option value="volume">Volume (litres)</option>
      <option value="pcs">Pieces</option>
      <option value="%">Percentage (%)</option>
    </LabeledSelect>
  );
};

const mapQuantityToString = (quantity, measure) => {
  switch (measure) {
    case 'mass':
      return math.unit(quantity, 'kg').toString();
    case 'volume':
      return math.unit(quantity, 'l').toString();
    case '%':
      return quantity + '%';
    case 'pcs':
      return quantity + ' pieces';
  }
};

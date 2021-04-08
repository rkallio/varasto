import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  LabeledInput,
  LabeledSelect,
} from '../components/form-components.jsx';
import styled from 'styled-components';
import * as math from 'mathjs';
import { useDispatch, useSelector } from 'react-redux';
import { itemSelector, findAllItems } from './item.redux.js';
import { actions, payloadCreators } from '../modal/modal.redux.js';
import GroupList, { ListElement } from '../components/grouplist.jsx';

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

const ItemComponent = styled(ListElement)`
  background: ${(props) => props.color};
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

  const onClick = () =>
    dispatch(actions.push(payloadCreators.editItem(id)));

  return (
    <ItemComponent
      onClick={onClick}
      color={computeColor(item.currentQuantity, item.targetQuantity)}
    >
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
  return `hsl(${color}, 75%, 90%)`;
};

const CurrentQuantity = styled.span.attrs((props) => ({
  children: mapQuantityToString(props.value, props.measure),
}))``;

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
      <option value={MASS}>Mass (kg)</option>
      <option value={VOLUME}>Volume (litres)</option>
      <option value={PCS}>Pieces</option>
      <option value={PERCENTAGE}>Percentage (%)</option>
    </LabeledSelect>
  );
};

const MASS = 'mass';
const VOLUME = 'volume';
const PCS = 'pcs';
const PERCENTAGE = '%';

const mapQuantityToString = (quantity, measure) => {
  switch (measure) {
    case MASS:
      return math.unit(quantity, 'kg').toString();
    case VOLUME:
      return math.unit(quantity, 'l').toString();
    case PERCENTAGE:
      return quantity + '%';
    case PCS:
      return quantity + ' pieces';
  }
};

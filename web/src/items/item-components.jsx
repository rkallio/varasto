import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    LabeledInput,
    LabeledSelect,
} from '../components/form-components.jsx';
import * as css from './item-components.module.css';
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
            render={(item) => <Item key={item.id} id={item.id} />}
        />
    );
};

export default ItemList;

const Item = (props) => {
    const { id } = props;
    const item = useSelector((state) =>
        itemSelector.selectById(state, id)
    );
    const dispatch = useDispatch();

    return (
        <div
            className={css.outerItem}
            onClick={() => dispatch(actions.editItem(id))}
        >
            <Card>
                <div className={css.innerItem}>
                    <TaggedName>{item.name}</TaggedName>
                    <TaggedQuantity
                        current={item.currentQuantity}
                        target={item.targetQuantity}
                        measure={item.measure}
                    />
                </div>
            </Card>
        </div>
    );
};

Item.propTypes = {
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

export const Property = ({ children }) => {
    return <div className={css.property}>{children}</div>;
};

Property.propTypes = {
    children: PropTypes.node.isRequired,
};

const PropertyName = ({ children }) => {
    return <div className={css.propertyName}>{children}</div>;
};

PropertyName.propTypes = {
    children: PropTypes.string.isRequired,
};

const Space = () => {
    return <span>&nbsp;</span>;
};

export const Name = ({ children }) => {
    return <PropertyValue>{children}</PropertyValue>;
};

Name.propTypes = {
    children: PropTypes.string.isRequired,
};

const PropertyValue = ({ children }) => {
    return <div className={css.propertyValue}>{children}</div>;
};

PropertyValue.propTypes = {
    children: PropTypes.node.isRequired,
};

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
            <Quantity
                current={current}
                target={target}
                measure={measure}
            />
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

export const CurrentQuantity = ({ value, target, measure }) => {
    const color = `hsl(${Math.min(
        180,
        (value / target) * 120
    )}, 50%, 50%)`;

    return (
        <span className={css.currentQuantity} style={{ color }}>
            {mapQuantityToString(value, measure)}
        </span>
    );
};

CurrentQuantity.propTypes = {
    value: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired,
    measure: PropTypes.string.isRequired,
};

export const QuantitySeparator = () => {
    return <span className={css.quantitySeparator}>/</span>;
};

export const TargetQuantity = ({ value, measure }) => {
    return (
        <span className={css.targetQuantity}>
            {mapQuantityToString(value, measure)}
        </span>
    );
};

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
    const [formattedTime, setFormattedTime] = useState(
        timeSince(time)
    );

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

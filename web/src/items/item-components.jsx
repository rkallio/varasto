import React, { forwardRef, useState, useEffect } from 'react';
import {
    LabeledInput,
    LabeledSelect,
} from '../components/form-components.jsx';
import * as css from './item-components.module.css';
import * as math from 'mathjs';
import { useDispatch, useSelector } from 'react-redux';
import { itemSelector, findAllItems } from './item.redux.js';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { actions } from '../modal.redux.js';
import Card from '../components/card.jsx';
import GroupList from '../components/grouplist.jsx';

export default ItemList = (props) => {
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

const Item = (props) => {
    const { id, ...rest } = props;
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
                    <TaggedName value={item.name} />
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

export const TaggedName = (props) => {
    return (
        <Property>
            <PropertyName>Name</PropertyName>
            <Space />
            <Name>{props.value}</Name>
        </Property>
    );
};

export const Property = (props) => {
    return <div className={css.property}>{props.children}</div>;
};

const PropertyName = (props) => {
    return <div className={css.propertyName}>{props.children}</div>;
};

const Space = (props) => {
    return <span>&nbsp;</span>;
};

export const Name = (props) => {
    return <PropertyValue>{props.children}</PropertyValue>;
};

const PropertyValue = (props) => {
    return <div className={css.propertyValue}>{props.children}</div>;
};

export const TaggedLocation = (props) => {
    return (
        <Property>
            <PropertyName>Location</PropertyName>
            <Space />
            <Location>{props.children}</Location>
        </Property>
    );
};

export const Location = (props) => {
    return <PropertyValue>{props.children}></PropertyValue>;
};

export const TaggedQuantity = (props) => {
    return (
        <Property>
            <PropertyName>Quantity</PropertyName>
            <Space />
            <Quantity
                current={props.current}
                target={props.target}
                measure={props.measure}
            />
        </Property>
    );
};

const Quantity = (props) => {
    return (
        <PropertyValue>
            <CurrentQuantity
                value={props.current}
                target={props.target}
                measure={props.measure}
            />
            <QuantitySeparator />
            <TargetQuantity
                value={props.target}
                measure={props.measure}
            />
        </PropertyValue>
    );
};

export const CurrentQuantity = (props) => {
    const color = `hsl(${Math.min(
        180,
        (props.value / props.target) * 120
    )}, 50%, 50%)`;

    return (
        <span className={css.currentQuantity} style={{ color }}>
            {mapQuantityToString(props.value, props.measure)}
        </span>
    );
};

export const QuantitySeparator = (props) => {
    return <span className={css.quantitySeparator}>/</span>;
};

export const TargetQuantity = (props) => {
    return (
        <span className={css.targetQuantity}>
            {mapQuantityToString(props.value, props.measure)}
        </span>
    );
};

export const TaggedLastModified = (props) => {
    return (
        <Property>
            <PropertyName>Last Modified</PropertyName>
            <Space />
            <LastModified time={props.time} />
        </Property>
    );
};

export const LastModified = (props) => {
    return (
        <PropertyValue>
            <Relatime time={props.time} />
        </PropertyValue>
    );
};

export const Relatime = (props) => {
    const [formattedTime, setFormattedTime] = useState(
        timeSince(props.time)
    );

    useEffect(() => {
        setFormattedTime(timeSince(props.time));
        const timer = setInterval(() => {
            setFormattedTime(timeSince(props.time));
        }, 2500);
        return () => {
            return clearInterval(timer);
        };
    }, [props.time]);

    return <time dateTime={props.time}>{formattedTime}</time>;
};

const timeSince = (time) => {
    return formatDistanceToNow(parseISO(time), {
        includeSeconds: true,
        addSuffix: true,
    });
};

export const NameInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="name"
            ref={ref}
            label="Name"
            placeholder="Milk"
            {...props}
        />
    );
});

export const LocationInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="location"
            ref={ref}
            label="Location"
            placeholder="Fridge"
            {...props}
        />
    );
});

export const CurrentQuantityInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="currentQuantity"
            ref={ref}
            label="Current Quantity"
            type="number"
            min="0"
            step="any"
            {...props}
        />
    );
});

export const TargetQuantityInput = forwardRef((props, ref) => {
    return (
        <LabeledInput
            name="targetQuantity"
            ref={ref}
            label="Target Quantity"
            type="number"
            min="0"
            step="any"
            {...props}
        />
    );
});

export const MeasureInput = forwardRef((props, ref) => {
    return (
        <LabeledSelect
            name="measure"
            ref={ref}
            label="Measure"
            {...props}
        >
            <option value="mass">Mass (kg)</option>
            <option value="volume">Volume (litres)</option>
            <option value="pcs">Pieces</option>
            <option value="%">Percentage (%)</option>
        </LabeledSelect>
    );
});

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

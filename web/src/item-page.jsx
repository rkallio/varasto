import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as css from './item-page.module.css';
import { itemSelector, findAllItems } from './item.redux.js';

import { formatDistanceToNow, parseISO } from 'date-fns';
import { actions } from './modal.redux.js';
import Container from './container.jsx';
import AddButton from './add-button.jsx';

import * as math from 'mathjs';

const Property = ({ name, value }) => {
    return (
        <div className={css.propertyContainer}>
            <div className={css.propertyName}>{name}:</div>
            <div className={css.propertyValue}>{value}</div>
        </div>
    );
};

const Item = ({ id }) => {
    const item = useSelector((state) =>
        itemSelector.selectById(state, id)
    );
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => dispatch(actions.editItem(id))}
            className={css.itemContainer}
        >
            <Property name="Name" value={item.name} />
            <Property name="Location" value={item.location} />
            <Property
                name="Quantity"
                value={
                    <Quantity
                        left={item.currentQuantity}
                        right={item.targetQuantity}
                        measure={item.measure}
                    />
                }
            />
            <Property
                name="Last Modified"
                value={<Timestamp isoTime={item.updatedAt} />}
            />
        </div>
    );
};

const Quantity = (props) => {
    return (
        <>
            <Measure value={props.left} name={props.measure} />
            /
            <Measure value={props.right} name={props.measure} />
        </>
    );
};

const Volume = (props) => {
    const unit = math.unit(props.value, 'l');
    return unit.toString();
};

const Mass = (props) => {
    const unit = math.unit(props.value, 'kg');
    return unit.toString();
};

const Measure = (props) => {
    if (props.name === 'mass') {
        return <Mass value={props.value} />;
    } else if (props.name === 'volume') {
        return <Volume value={props.value} />;
    } else {
        return `${props.value} pieces`;
    }
};

const FractionalColor = ({ dividend, divisor }) => {
    const fraction = Math.min(dividend / divisor, 3);
    return (
        <span
            style={{
                color: `hsl(${fraction * 90}, 50%, 50%)`,
            }}
        >
            {dividend}
        </span>
    );
};

const timeSince = (isoTime) =>
    formatDistanceToNow(parseISO(isoTime), {
        includeSeconds: true,
        addSuffix: true,
    });

const Timestamp = ({ isoTime }) => {
    const [formattedTime, setFormattedTime] = useState(
        timeSince(isoTime)
    );

    useEffect(() => {
        const timer = setInterval(
            () => setFormattedTime(timeSince(isoTime)),
            5000
        );
        return () => clearInterval(timer);
    }, [isoTime]);

    return <time dateTime={isoTime}>{formattedTime}</time>;
};
const ItemList = (props) => {
    const dispatch = useDispatch();
    const ids = useSelector(itemSelector.selectIds);
    useEffect(() => {
        dispatch(findAllItems());
    }, []);

    return (
        <div className={css.list}>
            {ids.map((id) => (
                <Item id={id} key={id} />
            ))}
        </div>
    );
};

export default () => {
    return (
        <Container>
            <ItemList />
            <AddButton />
        </Container>
    );
};

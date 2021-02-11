import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as css from './item-page.module.css';
import { itemSelector, findAllItems } from './item.redux.js';

import { formatDistanceToNow, parseISO } from 'date-fns';
import { actions } from './modal.redux.js';
import Container from './container.jsx';
import AddButton from './add-button.jsx';

const Property = ({ name, value }) => {
    return (
        <div className={css.propertyContainer}>
            <div className={css.propertyName}>{name}:</div>
            <div className={css.propertyValue}>{value}</div>
        </div>
    );
}

const Item = ({ id }) => {
    const item = useSelector(
        state =>itemSelector.selectById(state, id));
    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(actions.editItem(id))} className={css.itemContainer}>
            <Property
                name="Name"
                value={item.name}
            />
            <Property
                name="Location"
                value={item.location}
            />
            <Property
                name="Quantity"
                value={
                    <FractionalQuantity
                        left={item.currentQuantity}
                        right={item.targetQuantity}
                    />
                }
            />
            <Property
                name="Last Modified"
                value={<Timestamp isoTime={item.updatedAt} />}
            />
        </div>
    )
}

const FractionalQuantity = (props) => {
    const left = (
        <FractionalColor
            dividend={props.left}
            divisor={props.right}
        />
    );
    const right = (
        <span>{props.right}</span>
    );

    return (
        <>
            <FractionalColor
                dividend={props.left}
                divisor={props.right} />
            /
            {props.right}
        </>
    );
}

const FractionalColor = ({ dividend, divisor }) => {
    const fraction = Math.min(dividend / divisor, 3);
    return (
        <span style={{
                  color: `hsl(${fraction * 90}, 50%, 50%)`
              }}
        >
            {dividend}
        </span>
    );
}

const timeSince = (isoTime) => formatDistanceToNow(
    parseISO(isoTime), {
        includeSeconds: true,
        addSuffix: true
    }
);

const Timestamp = ({ isoTime}) => {
    const [formattedTime, setFormattedTime] = useState(
        timeSince(isoTime));

    useEffect(() => {
        const timer = setInterval(
            () => setFormattedTime(timeSince(isoTime)),
            5000
        );
        return () => clearInterval(timer)
    }, [isoTime]);

    return (
        <time dateTime={isoTime}>{formattedTime}</time>
    );
}
const ItemList = props => {
    const dispatch = useDispatch();
    const ids = useSelector(itemSelector.selectIds);
    useEffect(() => {
        dispatch(findAllItems());
    }, []);

    return (
        <div className={css.list}>
                {
                    ids.map(id => <Item id={id} key={id} />)
                }
        </div>
    );
}

export default () => {
    return (
        <Container>
            <ItemList />
            <AddButton />
        </Container>
    );
}

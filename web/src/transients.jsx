import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleCompleted,
    findAll,
    create,
    selector as transientSelector,
} from './transient.redux.js';
import * as css from './transients.module.css';
import * as itemcss from './items.module.css';
import Card from './components/card.jsx';
import * as Items from './items.jsx';
import { actions } from './modal.redux.js';
import ItemForm from './item-form.jsx';
import { LabeledInput, LabeledSelect } from './forms.jsx';
import GroupList from './components/grouplist.jsx';

export default TransientList = (props) => {
    const dispatch = useDispatch();
    const transients = useSelector((state) => {
        const transients = transientSelector.selectAll(state);
        return { Transients: transients };
    });

    useEffect(() => {
        dispatch(findAll());
    }, []);

    return (
        <GroupList
            data={Object.entries(transients)}
            render={(t) => <Transient key={t.id} id={t.id} />}
        />
    );
};

const Group = (props) => {
    return <div className={itemcss.itemGroup}>{props.children}</div>;
};

const Transients = (props) => {
    return props.ids
        .map((id) => <Transient id={id} key={id} />)
        .concat([<AddTransient />]);
};

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

export const TransientCreator = (props) => {
    const dispatch = useDispatch();
    const dispatcher = (values) => dispatch(create(values));

    return (
        <form>
            <NameInput />
            <CompletedInput />
        </form>
    );
};

const AddTransient = (props) => {
    const dispatch = useDispatch();

    return (
        <div
            className={itemcss.item}
            onClick={() => dispatch(actions.addTransient())}
        >
            <Card>
                <div className={itemcss.innerItem}>
                    <Items.Property>+</Items.Property>
                </div>
            </Card>
        </div>
    );
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
        <LabeledSelect name="completed" label="Completed" {...props}>
            <option value={false}>False</option>
            <option value={true}>True</option>
        </LabeledSelect>
    );
};

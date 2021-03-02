import React from 'react';
import * as css from './grouplist.module.css';

export default GroupList = (props) => {
    const { render, data, ...rest } = props;
    const mapfn = ([category, items]) => (
        <Group
            key={category}
            data={items}
            header={category}
            render={render}
        />
    );

    return <div className={css.groupList}>{data.map(mapfn)}</div>;
};

const Group = (props) => {
    const { render, data, header, ...rest } = props;

    return (
        <div className={css.group}>
            <Header>{header}</Header>
            <Body>{data.map(render)}</Body>
            <Separator />
        </div>
    );
};

const Header = (props) => {
    const { children, ...rest } = props;
    return (
        <div className={css.header} {...rest}>
            {children}
        </div>
    );
};

const Separator = (props) => {
    return <hr className={css.separator} />;
};

const Body = (props) => {
    const { children, ...rest } = props;
    return <div className={css.body}>{children}</div>;
};

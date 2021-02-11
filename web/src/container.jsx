import React from 'react';
import css from './container.module.css';

export default (props) => {
    return (
        <div className={css.container}>
            { props.children }
        </div>
    );
}

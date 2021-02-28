import React from 'react';
import * as css from './card.module.css';

export default Card = (props) => {
    return (
        <div className={css.card} {...props}>
            {props.children}
        </div>
    );
};

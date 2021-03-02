import React from 'react';
import * as css from './card.module.css';

export default Card = (props) => {
    const { children, ...rest } = props;
    return (
        <div className={css.card} {...rest}>
            {children}
        </div>
    );
};

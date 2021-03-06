import React from 'react';
import PropTypes from 'prop-types';
import * as css from './card.module.css';

const Card = (props) => {
    const { children, ...rest } = props;
    return (
        <div className={css.card} {...rest}>
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Card;

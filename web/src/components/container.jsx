import React from 'react';
import PropTypes from 'prop-types';
import * as css from './container.module.css';

const Container = ({ children }) => {
    return <div className={css.container}>{children}</div>;
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Container;

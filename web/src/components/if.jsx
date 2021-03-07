import PropTypes from 'prop-types';

const If = ({ cond, children }) => {
  if (cond) {
    return children;
  } else {
    return null;
  }
};

If.propTypes = {
  cond: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};

export default If;

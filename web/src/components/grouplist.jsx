import React from 'react';
import PropTypes from 'prop-types';

import * as css from './grouplist.module.css';

const GroupList = (props) => {
  const { render, data } = props;
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

GroupList.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default GroupList;

const Group = (props) => {
  const { render, data, header } = props;

  return (
    <div className={css.group}>
      <Header>{header}</Header>
      <Body>{data.map(render)}</Body>
      <Separator />
    </div>
  );
};

Group.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.string.isRequired,
};

const Header = (props) => {
  const { children, ...rest } = props;
  return (
    <div className={css.header} {...rest}>
      {children}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

const Separator = () => {
  return <hr className={css.separator} />;
};

const Body = (props) => {
  const { children } = props;
  return <div className={css.body}>{children}</div>;
};

Body.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

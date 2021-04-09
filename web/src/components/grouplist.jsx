import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './card.jsx';

const StyledGroupList = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

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

  return <StyledGroupList>{data.map(mapfn)}</StyledGroupList>;
};

GroupList.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default GroupList;

const StyledGroup = styled.div`
  margin-bottom: 15px;
`;

export const Group = (props) => {
  const { render, data, header } = props;

  return (
    <StyledGroup>
      <Header>{header}</Header>
      <Body>{data.map(render)}</Body>
      <Separator />
    </StyledGroup>
  );
};

Group.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.string.isRequired,
};

const Header = styled.div`
  font-size: 1.2em;
`;

const Separator = styled.hr`
  border: 1px solid black;
`;

const Body = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  margin-left: -3px;
  margin-right: -3px;
`;

export const ListElement = styled(Card)`
  user-select: none;
  flex-grow: 1;
  margin: 3px;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
  }

  &:active {
    background: white;
    color: black;
  }
`;

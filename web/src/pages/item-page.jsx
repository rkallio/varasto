import React from 'react';
import Container from '../components/container.jsx';
import AddButton from '../components/add-button.jsx';
import ItemList from '../items/item-components.jsx';
import TransientList from '../transients/transient-components.jsx';
import styled from 'styled-components';

const ItemPageComponent = styled.div`
  padding-bottom: 50px;
`;

const ItemPage = () => {
  return (
    <Container>
      <ItemPageComponent>
        <ItemList />
        <TransientList />
      </ItemPageComponent>
      <AddButton />
    </Container>
  );
};

export default ItemPage;

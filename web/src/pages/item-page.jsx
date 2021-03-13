import React from 'react';
import Container from '../components/container.jsx';
import { OpenModalButton } from '../modal/modal-buttons.jsx';
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
      <OpenModalButton />
    </Container>
  );
};

export default ItemPage;

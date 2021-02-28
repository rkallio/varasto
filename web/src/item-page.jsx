import React from 'react';
import Container from './container.jsx';
import AddButton from './add-button.jsx';
import ItemList from './items.jsx';

export default () => {
    return (
        <Container>
            <ItemList />
            <AddButton />
        </Container>
    );
};

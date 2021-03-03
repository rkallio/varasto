import React from 'react';
import Container from '../components/container.jsx';
import AddButton from '../components/add-button.jsx';
import ItemList from '../items.jsx';
import TransientList from '../transients.jsx';

export default () => {
    return (
        <Container>
            <div>
                <ItemList />
                <TransientList />
            </div>
            <AddButton />
        </Container>
    );
};

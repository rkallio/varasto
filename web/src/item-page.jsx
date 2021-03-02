import React from 'react';
import Container from './container.jsx';
import AddButton from './add-button.jsx';
import ItemList from './items.jsx';
import TransientList from './transients.jsx';

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

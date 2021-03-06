import React from 'react';
import Container from '../components/container.jsx';
import AddButton from '../components/add-button.jsx';
import ItemList from '../items/item-components.jsx';
import TransientList from '../transients/transient-components.jsx';
import * as css from './item-page.module.css';

const ItemPage = () => {
    return (
        <Container>
            <div className={css.itemPage}>
                <ItemList />
                <TransientList />
            </div>
            <AddButton />
        </Container>
    );
};

export default ItemPage;

/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Filters } from './components/Filters';
import { List } from './components/List';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(({ id }) => product.categoryId === id);
  const user = usersFromServer.find(({ id }) => category.ownerId === id);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredProducts = products
    .filter(product => (!selectedUserId || product.user.id === selectedUserId)
      && (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      && (selectedCategories.length === 0 || selectedCategories.includes(product.category.id)));

  const changeCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(prevState => prevState.filter(id => id !== categoryId));
    } else {
      setSelectedCategories(prevState => [...prevState, categoryId]);
    }
  };

  const clearCategories = () => setSelectedCategories([]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Filters
          users={usersFromServer}
          selectedUserId={selectedUserId}
          changeSelectedUserId={setSelectedUserId}
          searchQuery={searchQuery}
          changeSearchQuery={setSearchQuery}
          categories={categoriesFromServer}
          selectedCategories={selectedCategories}
          changeCategory={changeCategory}
          clearCategories={clearCategories}
        />
        <List products={filteredProducts} />
      </div>
    </div>
  );
};

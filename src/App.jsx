import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import UserFilter from './components/UserFilter/UserFilter';
import SearchBar from './components/SearchBar/SearchBar';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
// eslint-disable-next-line max-len
import ResetFilterButton from './components/ResetFilterButton/ResetFilterButton';
import ProductsTable from './components/ProductsTable/ProductsTable';

const products = productsFromServer.map(({ categoryId, ...product }) => {
  const category = categoriesFromServer.find(({ id }) => id === categoryId);
  const user = usersFromServer.find(({ id }) => id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [chosenUserId, setChosenUserId] = useState(null);
  const [chosenCategories, setChosenCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const resetAllFilters = () => {
    setChosenUserId(null);
    setSearchQuery('');
    setChosenCategories([]);
  };

  const filteredByUserProducts = chosenUserId
    ? products.filter(product => product.user.id === chosenUserId)
    : products;

  const filteredProducts = chosenCategories.length
    ? filteredByUserProducts.filter(
      product => chosenCategories.includes(product.category.id),
    ) : filteredByUserProducts;
  const displayedProducts = filteredProducts.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserFilter
              chosenUserId={chosenUserId}
              setChosenUserId={setChosenUserId}
              usersFromServer={usersFromServer}
            />
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <CategoryFilter
              chosenCategories={chosenCategories}
              setChosenCategories={setChosenCategories}
              categoriesFromServer={categoriesFromServer}
            />
            <ResetFilterButton resetFilters={resetAllFilters} />
          </nav>
        </div>

        <div className="box table-container">
          {displayedProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductsTable displayedProducts={displayedProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import { List } from './components/List';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { UserFilter } from './components/UserFilter';
import { Search } from './components/Search';

const products = productsFromServer.map((product) => {
  const category
    = categoriesFromServer.find(cat => cat.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer.find(person => person.id === category.ownerId); // find by category.ownerId

  return { product, user, category };
});

export const App = () => {
  const [pickedUser, setPickedUser] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleReset = () => {
    setPickedUser(null);
    setQuery('');
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const uniqueCategoryIds = new Set();

  products.forEach((product) => {
    uniqueCategoryIds.add(product.category.id);
  });

  const uniqueCategoryIdsArray = Array.from(uniqueCategoryIds);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            <p className="panel-tabs has-text-weight-bold">
              <UserFilter
                usersFromServer={usersFromServer}
                pickedUser={pickedUser}
                setPickedUser={setPickedUser}
              />
            </p>

            <Search query={query} setQuery={setQuery} />

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>
              {uniqueCategoryIdsArray.map((categoryId) => {
                const category
                  = categoriesFromServer.find(cat => cat.id === categoryId);

                return (
                  <a
                    key={categoryId}
                    data-cy="Category"
                    className={`button mr-2 my-1 ${
                      selectedCategories.includes(categoryId) ? 'is-info' : ''
                    }`}
                    href="#/"
                    onClick={() => toggleCategory(categoryId)}
                  >
                    {category.title}
                  </a>
                );
              })}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <List
            products={products}
            pickedUser={pickedUser}
            query={query}
            selectedCategories={selectedCategories}
          />
        </div>
      </div>
    </div>
  );
};

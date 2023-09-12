import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductList } from './components/ProductList';
import { UserList } from './components/UserList';
import { CategoriesList } from './components/CategoriesList';

const products = productsFromServer.map((product) => {
  const category
  = categoriesFromServer.find(cat => cat.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer.find(u => u.id === category.ownerId); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('all');
  const [textFilter, setTextFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('none');

  return (

    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <UserList
                users={usersFromServer}
                onUserSelect={setSelectedUser}
                selectedUser={selectedUser}
              />
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={textFilter}
                  onChange={e => setTextFilter(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {textFilter !== '' && (
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setTextFilter('')}
                  />
                  )}
                </span>
              </p>
            </div>

            <CategoriesList
              categories={categoriesFromServer}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSelectedUser('all');
                  setTextFilter('');
                  setSelectedCategory('all');
                  setOrder('none');
                  setSortBy('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <ProductList
          products={products}
          selectedUser={selectedUser}
          textFilter={textFilter}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
        />

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const toggleUserFilter = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  const filteredProducts = productsFromServer
    .map((product) => {
      const category = categoriesFromServer.find(
        // eslint-disable-next-line no-shadow
        category => category.id === product.categoryId,
      );
      // eslint-disable-next-line no-shadow
      const user = usersFromServer.find(user => user.id === category.ownerId);

      if (!category || !user) {
        return null;
      }

      return {
        id: product.id,
        name: product.name,
        category: {
          icon: category.icon,
          title: category.title,
        },
        user: {
          id: user.id,
          name: user.name,
          sex: user.sex,
        },
      };
    })
    .filter(product => (!selectedUserId || product.user.id === selectedUserId)
      && (!searchValue
        || product.name.toLowerCase().includes(searchValue.toLowerCase())));

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => toggleUserFilter(null)}
                className={!selectedUserId ? 'is-active' : ''}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => toggleUserFilter(user.id)}
                  className={selectedUserId === user.id ? 'is-active' : ''}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <div className="control">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                />
              </div>
              {searchValue && (
              <button
                type="button"
                className="delete is-small"
                onClick={clearSearch}
                aria-label="Clear Search"
                data-cy="ClearButton"
              />
              )}
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length > 0 ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>
                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {product.category.icon}
                      {' '}
                      -
                      {' '}
                      {product.category.title}
                    </td>
                    <td
                      data-cy="ProductUser"
                      className={
                product.user.sex === 'm'
                  ? 'has-text-link'
                  : 'has-text-danger'
              }
                    >
                      {product.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No matching products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const productsWithCategories = productsFromServer.map((product) => {
    const category = categoriesFromServer.find(c => c.id === product.categoryId);

    return {
      ...product,
      category,
    };
  });

  const doesProductMatchSearch = (product, searchValue) => {
    if (!searchValue) {
      return true;
    }

    const productNameLower = product.name.toLowerCase();
    const searchValueLower = searchValue.toLowerCase();

    return productNameLower.includes(searchValueLower);
  };

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
              className={showAllProducts ? 'is-active' : ''}
              onClick={() => {
                setSelectedUser(null);
                setShowAllProducts(true);
              }}
            >
              All
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
              className={selectedUser === 'Roma' ? 'is-active' : ''}
              onClick={() => {
                setSelectedUser('Roma');
                setShowAllProducts(null);
              }
              }
            >
              User 1
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
              className={selectedUser === 'Anna' ? 'is-active' : ''}
              onClick={() => {
                setSelectedUser('Anna');
                setShowAllProducts(null);
              }
              }
            >
              User 2
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
              className={selectedUser === 'Max' ? 'is-active' : ''}
              onClick={() => {
                setSelectedUser('Max');
                setShowAllProducts(null);
              }
              }
            >
              User 3
            </a>
            <a
              data-cy="FilterUser"
              href="#/"
              className={selectedUser === 'John' ? 'is-active' : ''}
              onClick={() => {
                setSelectedUser('John');
                setShowAllProducts(null);
              }
              }
            >
              User 4
            </a>
          </p>

          <div className="panel-block">
            <p className="control has-icons-left has-icons-right">
              <input
                data-cy="SearchField"
                type="text"
                className="input"
                placeholder="Search"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />

              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>

              {searchValue && (
                <span className="icon is-right">
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setSearchValue('')}
                  />
                </span>
              )}
            </p>
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

            <a
              data-cy="Category"
              className="button mr-2 my-1"
              href="#/"
            >
              Category 2
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              Category 3
            </a>
            <a
              data-cy="Category"
              className="button mr-2 my-1"
              href="#/"
            >
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
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>

        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  ID

                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Product

                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort-down" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Category

                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort-up" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  User

                  <a href="#/">
                    <span className="icon">
                      <i data-cy="SortIcon" className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {productsWithCategories
              .filter((product) => {
                const owner = usersFromServer.find(user => user.id === product.category.ownerId);

                return showAllProducts || selectedUser === owner.name;
              })
              .filter(product => doesProductMatchSearch(product, searchValue))
              .map(product => (
              <tr key={product.id} data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>

                <td data-cy="ProductName">{product.name}</td>

                <td data-cy="ProductCategory">
                {(() => {
                  const foundCategory = categoriesFromServer.find(category => category.id === product.categoryId);

                  return foundCategory ? foundCategory.icon : 'no category found';
                })()}
                </td>

                <td
                  data-cy="ProductUser"
                  className={(usersFromServer.find(user => user.id === (categoriesFromServer.find(category => category.id === product.categoryId)).ownerId).sex) === 'm'
                    ? 'has-text-link'
                    : 'has-text-danger'}
                >
                  {usersFromServer.find(user => user.id === (categoriesFromServer.find(category => category.id === product.categoryId)).ownerId)?.name || 'No user found'}
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

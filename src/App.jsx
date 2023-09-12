import React, { useState, useEffect } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => cat.id === product.categoryId);
  const user = usersFromServer.find(us => us.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState(products);

  useEffect(() => {
    setFilters(products
      .filter((product) => {
        if (selectedUser.name && input) {
          return product.user.name === selectedUser.name
                 && product.name.toLowerCase().includes(input.toLowerCase());
        }

        if (selectedUser.name) {
          return product.user.name === selectedUser.name;
        }

        if (input) {
          return product.name.toLowerCase().includes(input.toLowerCase());
        }

        return true;
      }));
  }, [selectedUser, input]);

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
                onClick={() => setSelectedUser({})}
                className={cn({
                  'is-active': !selectedUser.name,
                })}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': user.id === selectedUser.id,
                  })}
                >
                  {user.name}
                </a>
              ))}
              {/* <a
                data-cy="FilterUser"
                href="#/"
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 3
              </a> */}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
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
              {/* <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                1
              </td>

              <td data-cy="ProductName">Milk</td>
              <td data-cy="ProductCategory">🍺 - Drinks</td>

              <td
                data-cy="ProductUser"
                className="has-text-link"
              >
                Max
              </td>
            </tr>

            <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                2
              </td>

              <td data-cy="ProductName">Bread</td>
              <td data-cy="ProductCategory">🍞 - Grocery</td>

              <td
                data-cy="ProductUser"
                className="has-text-danger"
              >
                Anna
              </td>
            </tr>

            <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                3
              </td>

              <td data-cy="ProductName">iPhone</td>
              <td data-cy="ProductCategory">💻 - Electronics</td>

              <td
                data-cy="ProductUser"
                className="has-text-link"
              >
                Roma
              </td>
            </tr> */}
              {filters.map(product => (
                <tr key={product.id} data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td
                    data-cy="ProductCategory"
                  >
                    {`${product.category.icon} - ${product.category.title}`}

                  </td>

                  <td
                    data-cy="ProductUser"
                    className={cn({
                      'has-text-link': product.user.sex === 'm',
                      'has-text-danger': product.user.sex === 'f',
                    })}
                  >
                    {product.user.name}
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

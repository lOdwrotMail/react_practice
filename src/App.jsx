/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => cat.id === product.categoryId);
  const user = category ? usersFromServer
    .find(u => u.id === category.ownerId) : null;

  return {
    id: product.id,
    name: product.name,
    category: category ? `${category.icon} - ${category.title}` : 'Unknown Category',
    owner: user || { name: 'Unknown User', gender: 'unknown' },
  };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleUserFilter = (userId) => {
    setSelectedUser(userId);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const resetFilters = () => {
    setSelectedUser(null);
    setSelectedCategory(null);
    setSearchValue('');
  };

  const filteredProducts = products.filter((product) => {
    const matchesUser = !selectedUser || product.owner.id === selectedUser;
    const matchesCategory = !selectedCategory
    || (product.category.includes(selectedCategory)
    || (selectedCategory === 'All Categories'
    && product.category !== 'Unknown Category'));
    const matchesSearch = !searchValue
      || product.name.toLowerCase().includes(searchValue.toLowerCase());

    return matchesUser && matchesCategory && matchesSearch;
  });

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
                className={!selectedUser ? 'is-active' : ''}
                onClick={() => resetFilters()}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy={`FilterUser-${user.id}`}
                  href="#/"
                  className={selectedUser === user.id ? 'is-active' : ''}
                  onClick={() => handleUserFilter(user.id)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchValue}
                  onChange={el => handleSearch(el.target.value)}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                <span className="icon is-right">
                  {searchValue !== '' && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => handleSearch('')}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={!selectedCategory
                  ? 'is-active button is-success mr-6 is-outlined'
                  : 'button is-success mr-6 is-outlined'}
                onClick={() => handleCategoryFilter(null)}
              >
                All Categories
              </a>
              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy={`Category-${category.id}`}
                  className={selectedCategory === category.id
                    ? 'button mr-2 my-1 is-info is-active'
                    : 'button mr-2 my-1 is-info'}
                  href="#/"
                  onClick={() => handleCategoryFilter(category.id)}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
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
              {filteredProducts.map(product => (
                <tr key={product.id} data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>
                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {product.category}
                  </td>
                  <td
                    data-cy="ProductUser"
                    className={
                      product.owner.sex === 'm'
                        ? 'has-text-link'
                        : 'has-text-danger'
                    }
                  >
                    {product.owner.name}
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

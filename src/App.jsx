import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('All');
  const [productNameFilter, setProductNameFilter] = useState('');

  const filteredProducts = productsFromServer
    .filter((product) => {
      const category
      = categoriesFromServer.find(cat => cat.id === product.categoryId);
      const user = usersFromServer.find(usr => usr.id === category.ownerId);

      return selectedUser === 'All' || user.name === selectedUser;
    })
    .filter(product => product
      .name.toLowerCase().includes(productNameFilter.toLowerCase()));

  const uniqueUserNames = [...new Set(usersFromServer.map(user => user.name))];

  uniqueUserNames.unshift('All');

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleClearFilter = () => {
    setProductNameFilter('');
  };

  const products = filteredProducts.map((product) => {
    const category
    = categoriesFromServer.find(cat => cat.id === product.categoryId);
    const user = usersFromServer.find(usr => usr.id === category.ownerId);
    const ownerTextColorClass
    = user.sex === 'm' ? 'has-text-link' : 'has-text-danger';

    return (
      <tr key={product.id} data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          {product.id}
        </td>
        <td data-cy="ProductName">{product.name}</td>
        <td data-cy="ProductCategory">
          {category.icon}
          {` `}
          -
          {` `}
          {category.title}
        </td>
        <td
          data-cy="ProductUser"
          className={`${user.name === selectedUser ? 'is-active ' : ''}${ownerTextColorClass}`}
        >
          {user.name}
        </td>
      </tr>
    );
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <div className="box table-container">
          <div className="field">
            <label htmlFor="ownerFilter" className="label">
              Filter by Owner:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="ownerFilter"
                  value={selectedUser}
                  onChange={handleUserChange}
                  data-cy="OwnerFilter"
                >
                  {uniqueUserNames.map(userName => (
                    <option
                      key={userName}
                      value={userName}
                      className={userName === selectedUser ? 'is-active' : ''}
                    >
                      {userName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="productNameFilter" className="label">
              Filter by Product Name:
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                id="productNameFilter"
                className="input"
                placeholder="Enter product name"
                value={productNameFilter}
                onChange={e => setProductNameFilter(e.target.value)}
                data-cy="ProductNameFilter"
              />
              {productNameFilter && (
                <span className="icon is-small is-right">
                  <button
                    type="button"
                    className="delete is-small"
                    onClick={handleClearFilter}
                    data-cy="ClearFilterButton"
                  />
                </span>
              )}
            </div>
          </div>

          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <tbody>{products}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

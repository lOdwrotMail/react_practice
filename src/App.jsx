import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('All'); // Default selection is 'All'

  // Filter products based on the selected user
  const filteredProducts = productsFromServer.filter((product) => {
    const category
    = categoriesFromServer.find(cat => cat.id === product.categoryId);
    const user = usersFromServer.find(usr => usr.id === category.ownerId);

    return selectedUser === 'All' || user.name === selectedUser;
  });

  const uniqueUserNames = [...new Set(usersFromServer.map(user => user.name))];

  uniqueUserNames.unshift('All');

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const products = filteredProducts.map((product) => {
    const category
    = categoriesFromServer.find(cat => cat.id === product.categoryId);
    const user = usersFromServer.find(usr => usr.id === category.ownerId);
    const ownerTextColorClass
    = user.sex === 'm' ? 'has-text-link' : 'has-text-danger';

    return (
      <tr key={product.id} data-cy="Product">
        <td
          className="has-text-weight-bold"
          data-cy="ProductId"
        >
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

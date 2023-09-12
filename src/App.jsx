import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const products = productsFromServer.map((product) => {
    const category = categoriesFromServer
      .find(cat => cat.id === product.categoryId);
    const user = usersFromServer
      .find(usr => usr.id === category.ownerId);
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
        <td data-cy="ProductUser" className={ownerTextColorClass}>
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
            <tbody>{products}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

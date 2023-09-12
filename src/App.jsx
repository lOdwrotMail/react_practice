import React from 'react';
import './App.scss';
import { ProductTable } from './Components/ProductTable';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Filters } from './Components/Filters/Filters';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => cat.id === product.categoryId);
  const user = usersFromServer.find(u => u.id === category.ownerId);

  return { ...product, category, user };
});

const filterProducts = () => products;

export const App = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Product Categories</h1>

      <div className="block">
        <Filters categories={categoriesFromServer} users={usersFromServer} />
      </div>

      <div className="box table-container">
        {products.length === 0
          ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )
          : <ProductTable products={filterProducts()} />}

      </div>
    </div>
  </div>
);

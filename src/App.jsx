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

export const App = () => {
  const [nameFilter, setNameFilter] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState(-1);
  const [userFilter, setUserFilter] = React.useState(-1);

  const filterProducts = products.filter((product) => {
    const searchPattern = new RegExp(nameFilter.trim(), 'i');

    return product.name.search(searchPattern) > -1;
  }).filter(({ category }) => categoryFilter === -1
    || category.id === categoryFilter)
    .filter(({ user }) => userFilter === -1
    || user.id === userFilter);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            categories={categoriesFromServer}
            users={usersFromServer}
            set={{
              name: setNameFilter,
              category: setCategoryFilter,
              user: setUserFilter,
            }}
            get={{
              name: nameFilter,
              category: categoryFilter,
              user: userFilter,
            }}
          />
        </div>

        <div className="box table-container">
          {filterProducts.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
            : <ProductTable products={filterProducts} />}

        </div>
      </div>
    </div>
  );
};

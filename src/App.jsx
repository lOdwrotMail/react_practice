import React, { useState, useMemo } from 'react';
import './App.scss';
import { ProductsTable } from './components/ProductsTable';
import { Filters } from './components/Filters';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const categories = categoriesFromServer;
const users = usersFromServer;

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [sorted, setSorted] = useState(filters);

  const filteredProducts = (selUser, In, selCat) => {
    let filteredData = products;

    if (Object.keys(selUser).length !== 0) {
      filteredData = filteredData
        .filter(product => product.user.id === selUser.id);
    }

    if (input.length > 0) {
      filteredData = filteredData
        .filter(prod => prod.name.toLowerCase().includes(In.toLowerCase()));
    }

    if (selCat.length > 0) {
      filteredData = filteredData.filter(product => selectedCategories
        .some(cat => cat.title === product.category.title));
    }

    return setFilters(filteredData);
  };

  const selectSortBy = (e) => {
    setSortBy((prevState) => {
      if (prevState === e && isReversed === false) {
        setIsReversed(true);

        return e;
      }

      if (prevState === e && isReversed === true) {
        setIsReversed(false);

        return '';
      }

      setIsReversed(false);

      return e;
    });
  };

  const sortTable = (sort, reverse) => {
    let sortedTable;

    switch (sort) {
      case 'id':
        sortedTable = reverse
          ? setSorted([...filters].sort((a, b) => +a.id - +b.id).reverse())
          : setSorted([...filters].sort((a, b) => +a.id - +b.id));
        break;
      case 'product':
        sortedTable = reverse
          ? setSorted([...filters]
            .sort((a, b) => a.name.localeCompare(b.name)).reverse())
          : setSorted([...filters]
            .sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'category':

        sortedTable = reverse
          ? setSorted([...filters]
            .sort((a, b) => a.category.title
              .localeCompare(b.category.title)).reverse())
          : setSorted([...filters]
            .sort((a, b) => a.category.title
              .localeCompare(b.category.title)));
        break;
      case 'user':

        sortedTable = reverse
          ? setSorted([...filters]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)).reverse())
          : setSorted([...filters]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      default:
        sortedTable = setSorted(filters);
    }

    return sortedTable;
  };

  useMemo(() => sortTable(sortBy, isReversed), [sortBy, filters, isReversed]);

  useMemo(() => filteredProducts(
    selectedUser, input, selectedCategories,
  ), [selectedUser, input, selectedCategories]);

  const categorySelect = (cat) => {
    setSelectedCategories((prevState) => {
      if (cat.length === 0) {
        return [];
      }

      if (prevState.includes(cat)) {
        return prevState.filter(selectedCat => selectedCat.id !== cat.id);
      }

      return [...prevState, cat];
    });
  };

  const usersOnClickHandle = (e) => {
    setSelectedUser(e);
  };

  const inputOnChangeHandle = (e) => {
    setInput(e);
  };

  return (

    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <div className="block">
          <Filters
            usersOnClickHandle={usersOnClickHandle}
            inputOnChangeHandle={inputOnChangeHandle}
            filteredProducts={filteredProducts}
            categorySelect={categorySelect}
            users={users}
            selectedUser={selectedUser}
            input={input}
            categories={categories}
            selectedCategories={selectedCategories}
          />

        </div>

        <div className="box table-container">
          {filters.length === 0
           && (
           <p data-cy="NoMatchingMessage">
             No products matching selected criteria
           </p>
           )
          }
          <ProductsTable
            filters={sorted}
            selectSortBy={selectSortBy}
            sortBy={sortBy}
            isReversed={isReversed}
          />

        </div>
      </div>
    </div>
  );
};

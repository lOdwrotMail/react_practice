/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    ctgry => ctgry.id === product.categoryId,
  ); // find by product.categoryId
  const user = usersFromServer.find(usr => usr.id === category.ownerId); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [userFilter, setUserFilter] = useState(0);
  const [search, setSearch] = useState('');
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  // const [sortByColumn, setSortByColumn] = useState('');
  // const [sortArrow, setSortArrow] = useState(0);

  const willProductsFiltered = () => {
    let productsFiltered = products;

    if (userFilter !== 0) {
      productsFiltered = productsFiltered.filter(
        product => product.user.id === userFilter,
      );
    }

    if (search.length > 0) {
      productsFiltered = productsFiltered.filter(
        product => product.name.toLocaleLowerCase().includes(
          search.toLocaleLowerCase(),
        ),
      );
    }

    if (categoriesSelected.length > 0) {
      productsFiltered = productsFiltered.filter(
        product => categoriesSelected.includes(product.category.id),
      );
    }

    return productsFiltered;
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategorySelection = (categoryId) => {
    if (categoriesSelected.includes(categoryId)) {
      setCategoriesSelected(prevSelection => prevSelection.filter(
        prevCategoryId => prevCategoryId !== categoryId,
      ));
    } else {
      (
        setCategoriesSelected(prevSelection => (
          [...prevSelection, categoryId]
        ))
      );
    }
  };

  const resetAllFilters = () => {
    setUserFilter(0);
    setSearch('');
    setCategoriesSelected([]);
    // setSortByColumn('');
  };

  // const handleSortByColumn = (column) => {
  //   setSortByColumn((prevSort) => {
  //     if (prevSort === column) {
  //       return (sortArrow === 1
  //         ? setSortArrow(2)
  //         : setSortArrow(0)
  //       );
  //     }

  //     return setSortArrow(1);
  //   });

  //   // const productsSorted = [...productsFiltered];

  //   // if (sortByColumn === 'Product') {
  //   //   if (sortArrow === 1) {
  //   //     productsSorted.sort((a, b) => a.localeCompare(b));
  //   //   }

  //   //   if (sortArrow === 2) {
  //   //     productsSorted.sort((a, b) => b.localeCompare(a));
  //   //   }
  //   // }

  //   // return productsSorted;
  // };

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
                className={cn({ 'is-active': userFilter === 0 })}
                onClick={() => (setUserFilter(0))}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={cn({ 'is-active': user.id === userFilter })}
                  onClick={() => (setUserFilter(user.id))}
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
                  value={search}
                  onChange={handleSearchChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  { search !== ''
                    && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => (setSearch(''))}
                    />
                    )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6',
                  { 'is-outlined': !categoriesSelected.length < 1 })}
                onClick={() => {
                  setCategoriesSelected([]);
                }}
              >
                All
              </a>

              {categoriesFromServer.map(
                category => (
                  <a
                    data-cy="Category"
                    className={cn('button mr-2 my-1',
                      { 'is-info': categoriesSelected.includes(category.id) })}
                    href="#/"
                    key={category.id}
                    onClick={() => (handleCategorySelection(category.id))}
                  >
                    {category.title}
                  </a>
                ),
              )}

            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => (resetAllFilters())}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          { !willProductsFiltered().length
              && (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
              )}
          {!!willProductsFiltered().length
              && (
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

                            <i
                              data-cy="SortIcon"
                              // className={cn('fas',
                              //   { 'fa-sort-down': sortArrow === 2,
                              //     'fa-sort-up': sortArrow === 1,
                              //     'fa-sort': sortArrow === 0 })}
                              // onClick={() => {
                              //   handleSortByColumn('ID');
                              // }}
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              // className={cn('fas',
                              //   { 'fa-sort-down': sortArrow === 2,
                              //     'fa-sort-up': sortArrow === 1,
                              //     'fa-sort': sortArrow === 0 })}
                              // onClick={() => {
                              //   handleSortByColumn('Product');
                              // }}
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category

                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              // className={cn('fas',
                              //   { 'fa-sort-down': sortArrow === 2,
                              //     'fa-sort-up': sortArrow === 1,
                              //     'fa-sort': sortArrow === 0 })}
                              // onClick={() => {
                              //   handleSortByColumn('Category');
                              // }}
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              // className={cn('fas',
                              //   { 'fa-sort-down': sortArrow === 2,
                              //     'fa-sort-up': sortArrow === 1,
                              //     'fa-sort': sortArrow === 0 })}
                              // onClick={() => {
                              //   handleSortByColumn('User');
                              // }}
                            />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {willProductsFiltered().map(product => (
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">
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
              )}
        </div>
      </div>
    </div>
  );
};

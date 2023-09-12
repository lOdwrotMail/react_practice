import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

function getCategory(categoryId) {
  const foundCategory = categoriesFromServer
    .find(category => category.id === categoryId);

  return foundCategory;
}

function getOwner(userId) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser;
}

const productList = productsFromServer.map(product => ({
  ...product,
  category: getCategory(product.categoryId),
  owner: getOwner(getCategory(product.categoryId).ownerId),

}));

export const App = () => {
  const [findUser,SetFindUser] = useState('All');

  const [all, SetAll] = useState(true);
  const [grocery, SetGrocery] = useState(false);
  const [drinks, SetDrinks] = useState(false);
  const [fruits, SetFruits] = useState(false);
  const [electronics, SetElectronics] = useState(false);
  const [clothes, SetClothes] = useState(false);

  const sortByUser = (user) => {
    SetFindUser(user);
  };

  const allButtonSwitch = () => {
    SetAll(true);
    SetGrocery(false);
    SetDrinks(false);
    SetFruits(false);
    SetElectronics(false);
    SetClothes(false);
  };

  const grocerySwitch = () => {
    SetGrocery(!grocery);
    SetAll(false);
  };

  const drinksSwitch = () => {
    SetDrinks(!drinks);
    SetAll(false);
  };

  const fruitsSwitch = () => {
    SetFruits(!fruits);
    SetAll(false);
  };

  const electronicsSwitch = () => {
    SetElectronics(!electronics);
    SetAll(false);
  };

  const clothesSwitch = () => {
    SetClothes(!clothes);
    SetAll(false);
  };

  const reset = () => {
    SetFindUser('All');
    allButtonSwitch();
  };

  const userAll = () => {
    SetFindUser()
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


            >
              All
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
            >
              Roma
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
              className="is-active"

            >
              Anna
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
            >
              Max
            </a>
          </p>

          <div className="panel-block">
            <p className="control has-icons-left has-icons-right">
              <input
                data-cy="SearchField"
                type="text"
                className="input"
                placeholder="Search"
                value="qwe"
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
              onClick={allButtonSwitch}
              className={cn('button is-success mr-6', {
                'is-outlined': all !== true,
              })}

            >
              All
            </a>

            <a
              data-cy="Category"
              className={cn('button mr-2', {
                'my-1 is-info': grocery === true,
              })}
              href="#/"
              onClick={grocerySwitch}
            >
              Grocery
            </a>

            <a
              data-cy="Category"
              className={cn('button mr-2', {
                'my-1 is-info': drinks === true,
              })}
              href="#/"
              onClick={drinksSwitch}
            >
              Drinks
            </a>

            <a
              data-cy="Category"
              className={cn('button mr-2', {
                'my-1 is-info': fruits === true,
              })}
              href="#/"
              onClick={fruitsSwitch}
            >
              Fruits
            </a>
            <a
              data-cy="Category"
              className={cn('button mr-2', {
                'my-1 is-info': electronics === true,
              })}
              href="#/"
              onClick={electronicsSwitch}
            >
              Electronics
            </a>

            <a
              data-cy="Category"
              className={cn('button mr-2', {
                'my-1 is-info': clothes === true,
              })}
              href="#/"
              onClick={clothesSwitch}
            >
              Clothes
            </a>
          </div>

          <div className="panel-block">
            <a
              data-cy="ResetAllButton"
              href="#/"
              className="button is-link is-outlined is-fullwidth"
              onClick={reset}
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

            {productList.map(product => (
              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>

                <td data-cy="ProductName">{product.name}</td>
                <td data-cy="ProductCategory">
                  {product.category.icon} - {product.category.title}</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
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

//dsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd


)};

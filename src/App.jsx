/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
// import React from 'react';
// import './App.scss';

// import usersFromServer from './api/users';
// import categoriesFromServer from './api/categories';
// import productsFromServer from './api/products';

// // const products = productsFromServer.map((product) => {
// //   const category = null; // find by product.categoryId
// //   const user = null; // find by category.ownerId

// //   return null;
// // });

// export const App = () => (
//   const findCategoryById = (categoryId) => {
//     return categoriesFromServer.find((category) => category.id === categoryId);
//   };
//   <div className="section">
//     <div className="container">
//       <h1 className="title">Product Categories</h1>

//       <div className="block">
//         <nav className="panel">
//           <p className="panel-heading">Filters</p>

//           <p className="panel-tabs has-text-weight-bold">
//             <a
//               data-cy="FilterAllUsers"
//               href="#/"
//             >
//               All
//             </a>

//             <a
//               data-cy="FilterUser"
//               href="#/"
//             >
//               User 1
//             </a>

//             <a
//               data-cy="FilterUser"
//               href="#/"
//               className="is-active"
//             >
//               User 2
//             </a>

//             <a
//               data-cy="FilterUser"
//               href="#/"
//             >
//               User 3
//             </a>
//           </p>

//           <div className="panel-block">
//             <p className="control has-icons-left has-icons-right">
//               <input
//                 data-cy="SearchField"
//                 type="text"
//                 className="input"
//                 placeholder="Search"
//                 value="qwe"
//               />

//               <span className="icon is-left">
//                 <i className="fas fa-search" aria-hidden="true" />
//               </span>

//               <span className="icon is-right">
//                 {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//                 <button
//                   data-cy="ClearButton"
//                   type="button"
//                   className="delete"
//                 />
//               </span>
//             </p>
//           </div>

//           <div className="panel-block is-flex-wrap-wrap">
//             <a
//               href="#/"
//               data-cy="AllCategories"
//               className="button is-success mr-6 is-outlined"
//             >
//               All
//             </a>

//             <a
//               data-cy="Category"
//               className="button mr-2 my-1 is-info"
//               href="#/"
//             >
//               Category 1
//             </a>

//             <a
//               data-cy="Category"
//               className="button mr-2 my-1"
//               href="#/"
//             >
//               Category 2
//             </a>

//             <a
//               data-cy="Category"
//               className="button mr-2 my-1 is-info"
//               href="#/"
//             >
//               Category 3
//             </a>
//             <a
//               data-cy="Category"
//               className="button mr-2 my-1"
//               href="#/"
//             >
//               Category 4
//             </a>
//           </div>

//           <div className="panel-block">
//             <a
//               data-cy="ResetAllButton"
//               href="#/"
//               className="button is-link is-outlined is-fullwidth"
//             >
//               Reset all filters
//             </a>
//           </div>
//         </nav>
//       </div>

//       <div className="box table-container">
//         <p data-cy="NoMatchingMessage">
//           No products matching selected criteria
//         </p>

//         <table
//           data-cy="ProductTable"
//           className="table is-striped is-narrow is-fullwidth"
//         >
//           <thead>
//             <tr>
//               <th>
//                 <span className="is-flex is-flex-wrap-nowrap">
//                   ID

//                   <a href="#/">
//                     <span className="icon">
//                       <i data-cy="SortIcon" className="fas fa-sort" />
//                     </span>
//                   </a>
//                 </span>
//               </th>

//               <th>
//                 <span className="is-flex is-flex-wrap-nowrap">
//                   Product

//                   <a href="#/">
//                     <span className="icon">
//                       <i data-cy="SortIcon" className="fas fa-sort-down" />
//                     </span>
//                   </a>
//                 </span>
//               </th>

//               <th>
//                 <span className="is-flex is-flex-wrap-nowrap">
//                   Category

//                   <a href="#/">
//                     <span className="icon">
//                       <i data-cy="SortIcon" className="fas fa-sort-up" />
//                     </span>
//                   </a>
//                 </span>
//               </th>

//               <th>
//                 <span className="is-flex is-flex-wrap-nowrap">
//                   User

//                   <a href="#/">
//                     <span className="icon">
//                       <i data-cy="SortIcon" className="fas fa-sort" />
//                     </span>
//                   </a>
//                 </span>
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr data-cy="Product">
//               <td className="has-text-weight-bold" data-cy="ProductId">
//                 1
//               </td>

//               <td data-cy="ProductName">Milk</td>
//               <td data-cy="ProductCategory">🍺 - Drinks</td>

//               <td
//                 data-cy="ProductUser"
//                 className="has-text-link"
//               >
//                 Max
//               </td>
//             </tr>

//             <tr data-cy="Product">
//               <td className="has-text-weight-bold" data-cy="ProductId">
//                 2
//               </td>

//               <td data-cy="ProductName">Bread</td>
//               <td data-cy="ProductCategory">🍞 - Grocery</td>

//               <td
//                 data-cy="ProductUser"
//                 className="has-text-danger"
//               >
//                 Anna
//               </td>
//             </tr>

//             <tr data-cy="Product">
//               <td className="has-text-weight-bold" data-cy="ProductId">
//                 3
//               </td>

//               <td data-cy="ProductName">iPhone</td>
//               <td data-cy="ProductCategory">💻 - Electronics</td>

//               <td
//                 data-cy="ProductUser"
//                 className="has-text-link"
//               >
//                 Roma
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// );

import React, { useState } from 'react';
import './App.scss';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import usersFromServer from './api/users';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserFilter = (userId) => {
    setSelectedUser(userId);
  };

  const isUserActive = (userId) => {
    return selectedUser === userId;
  };

  const renderUserFilters = () => {
    return (
      <>
        <p className="panel-heading">Filters</p>
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={`panel-block ${!selectedUser ? 'is-active' : ''}`}
          onClick={() => handleUserFilter(null)}
        >
          All
        </a>
        {usersFromServer.map((user) => (
          <a
            key={user.id}
            data-cy="FilterUser"
            href="#/"
            className={`panel-block ${isUserActive(user.id) ? 'is-active' : ''}`}
            onClick={() => handleUserFilter(user.id)}
          >
            {user.name}
          </a>
        ))}
      </>
    );
  };

  const renderProductRow = (productId) => {
    const product = productsFromServer.find((p) => p.id === productId);

    if (!product) {
      return null;
    }

    // eslint-disable-next-line max-len
    const category = categoriesFromServer.find((c) => c.id === product.categoryId);
    const user = usersFromServer.find((u) => u.id === category.ownerId);

    if (!selectedUser || (user && user.id === selectedUser)) {
      return (
        <tr data-cy="Product" key={product.id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {product.id}
          </td>
          <td data-cy="ProductName">{product.name}</td>
          <td data-cy="ProductCategory">
            {category ? `${category.title} - ${category.icon}` : 'Category not found'}
          </td>
          <td data-cy="ProductUser" className={`has-text-${user ? 'link' : 'danger'}`}>
            {user ? user.name : 'User not found'}
          </td>
        </tr>
      );
    }

    return null;
  };

  // eslint-disable-next-line max-len
  const productRows = productsFromServer.map((product) => renderProductRow(product.id));

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <div className="block">
          <nav className="panel">
            {renderUserFilters()}
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
              {productRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

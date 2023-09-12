import React, { useState } from 'react';

/* eslint-disable jsx-a11y/accessible-emoji */
export const List = ({ products, pickedUser, query }) => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);
  const sortBy = (field) => {
    const isFirstClick = sortField !== field;
    const isSecondClick = sortField === field && !isReversed;

    setSortField(isFirstClick || isSecondClick ? field : '');
    setReversed(isSecondClick);
  };

  let visibleList = [...products];

  if (sortField) {
    visibleList.sort((a, b) => {
      switch (sortField) {
        case 'product':
        case 'category':
        case 'user':
          return a[sortField].localeCompare(b[sortField]);

        case 'id':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleList.reverse();
  }

  if (pickedUser) {
    visibleList = visibleList.filter(product => product.user.id === pickedUser);
  }

  if (query) {
    visibleList = visibleList
      .filter(product => product.product.name
        .toLowerCase().includes(query.trim().toLowerCase()));
  }

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID

              <a href="#/" onClick={() => sortBy('id')}>
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product

              <a href="#/" onClick={() => sortBy('product')}>
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category

              <a href="#/" onClick={() => sortBy('category')}>
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User

              <a href="#/" onClick={() => sortBy('user')}>
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {visibleList.map(product => (
          <React.Fragment key={product.product.id}>
            <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                {product.product.id}
                {' '}

              </td>

              <td data-cy="ProductName">{product.product.name}</td>
              <td data-cy="ProductCategory">
                {`${product.category.icon} - ${product.category.title}`}
              </td>

              <td
                data-cy="ProductUser"
                className={product.user.sex === 'f'
                  ? 'has-text-danger' : 'has-text-link'}
              >
                {product.user.name}
              </td>
            </tr>

          </React.Fragment>
        ))}

      </tbody>
    </table>
  );
};

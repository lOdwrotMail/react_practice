import React from 'react';

export const List = ({ products }) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {renderTableHeader('ID', 'fas fa-sort')}
        {renderTableHeader('Product', 'fas fa-sort-down')}
        {renderTableHeader('Category', 'fas fa-sort-up')}
        {renderTableHeader('User', 'fas fa-sort')}
      </tr>
    </thead>
    <tbody>
      {products.map(product => (
        <tr data-cy="Product" key={product.product.id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {product.product.id}
          </td>
          <td data-cy="ProductName">{product.product.name}</td>
          <td data-cy="ProductCategory">
            {`${product.category.icon} - ${product.category.title}`}
          </td>
          <td
            data-cy="ProductUser"
            className={`has-text-${product.user.sex === 'f' ? 'danger' : 'link'}`}
          >
            {product.user.name}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const renderTableHeader = (title, iconClass) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <a href="#/">
        <span className="icon">
          <i data-cy="SortIcon" className={iconClass} />
        </span>
      </a>
    </span>
  </th>
);

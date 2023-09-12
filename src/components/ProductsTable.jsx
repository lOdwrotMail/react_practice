/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';

export const ProductsTable = ({
  filters, selectSortBy, sortBy, isReversed,
}) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span
            className="is-flex is-flex-wrap-nowrap"

          >
            ID

            <a href="#/">
              <span
                className="icon"
                onClick={() => selectSortBy('id')}
              >
                <i
                  data-cy="SortIcon"
                  className={cn('fas', {
                    'fa-sort': sortBy !== 'id',
                    'fa-sort-up': sortBy === 'id' && !isReversed,
                    'fa-sort-down': sortBy === 'id' && isReversed,
                  })}
                />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span
            className="is-flex is-flex-wrap-nowrap"
            onClick={() => selectSortBy('product')}
          >
            Product

            <a href="#/">
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn('fas', {
                    'fa-sort': sortBy !== 'product',
                    'fa-sort-up': sortBy === 'product' && !isReversed,
                    'fa-sort-down': sortBy === 'product' && isReversed,
                  })}
                />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span
            className="is-flex is-flex-wrap-nowrap"
            onClick={() => selectSortBy('category')}
          >
            Category

            <a href="#/">
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn('fas', {
                    'fa-sort': sortBy !== 'category',
                    'fa-sort-up': sortBy === 'category' && !isReversed,
                    'fa-sort-down': sortBy === 'category' && isReversed,
                  })}
                />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span
            className="is-flex is-flex-wrap-nowrap"
            onClick={() => selectSortBy('user')}
          >
            User

            <a href="#/">
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn('fas', {
                    'fa-sort': sortBy !== 'user',
                    'fa-sort-up': sortBy === 'user' && !isReversed,
                    'fa-sort-down': sortBy === 'user' && isReversed,
                  })}
                />
              </span>
            </a>
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      {filters.map(product => (
        <tr key={product.id} data-cy="Product">
          <td className="has-text-weight-bold" data-cy="ProductId">
            {product.id}
          </td>

          <td data-cy="ProductName">{product.name}</td>
          <td
            data-cy="ProductCategory"
          >
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
);

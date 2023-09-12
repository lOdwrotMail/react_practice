/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cn from 'classnames';

export const ProductList = ({ products,
  selectedUser,
  textFilter,
  selectedCategory,
  sortBy,
  setSortBy,
  order,
  setOrder }) => {
  const settingOrder = (ord) => {
    if (ord === 'none') {
      setOrder('asc');
    } else if (ord === 'asc') {
      setOrder('desc');
    } else if (ord === 'desc') {
      setOrder('none');
    }
  };

  const filteredProducts = (prod) => {
    let prodCopy = [...prod];

    if (selectedUser !== 'all') {
      prodCopy = prodCopy.filter(product => product.category.ownerId
        === selectedUser.id);
    }

    if (textFilter !== '') {
      prodCopy = prodCopy.filter(product => product
        .name.toLowerCase().includes(textFilter.toLowerCase()));
    }

    if (selectedCategory !== 'all') {
      prodCopy = prodCopy.filter(product => product.categoryId
        === selectedCategory.id);
    }

    switch (sortBy) {
      case 'product':
        if (order === 'asc') {
          prodCopy.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (order === 'desc') {
          prodCopy.sort((a, b) => b.name.localeCompare(a.name));
        }

        break;

      case 'id':
        if (order === 'asc') {
          prodCopy.sort((a, b) => a.id - b.id);
        }

        if (order === 'desc') {
          prodCopy.sort((a, b) => b.id - a.id);
        }

        break;
      case 'category':
        if (order === 'asc') {
          prodCopy.sort((a, b) => a.category.title
            .localeCompare(b.category.title));
        }

        if (order === 'desc') {
          prodCopy.sort((a, b) => b.category.title
            .localeCompare(a.category.title));
        }

        break;

      case 'user':
        if (order === 'asc') {
          prodCopy.sort((a, b) => a.user.name
            .localeCompare(b.user.name));
        }

        if (order === 'desc') {
          prodCopy.sort((a, b) => b.user.name
            .localeCompare(a.user.name));
        }

        break;
      default:
    }

    return prodCopy;
  };

  const filtered = filteredProducts(products);

  return (
    <div className="box table-container">
      {filtered.length === 0 ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      ) : (

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
                        className={cn('fas',
                          { 'fa-sort': sortBy !== 'id' || order === 'none',
                            'fa-sort-up': sortBy === 'id' && order === 'asc',
                            'fa-sort-down': sortBy === 'id'
                            && order === 'desc' })}
                        onClick={() => {
                          settingOrder(order);
                          setSortBy('id');
                        }}
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
                        className={cn('fas',
                          { 'fa-sort': sortBy !== 'product' || order === 'none',
                            'fa-sort-up': sortBy === 'product'
                            && order === 'asc',
                            'fa-sort-down': sortBy === 'product'
                          && order === 'desc' })}
                        onClick={() => {
                          settingOrder(order);
                          setSortBy('product');
                        }}
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
                        className={cn('fas',
                          { 'fa-sort': sortBy !== 'category'
                          || order === 'none',
                          'fa-sort-up': sortBy === 'category'
                          && order === 'asc',
                          'fa-sort-down': sortBy === 'category'
                        && order === 'desc' })}
                        onClick={() => {
                          settingOrder(order);
                          setSortBy('category');
                        }}
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
                        className={cn('fas',
                          { 'fa-sort': sortBy !== 'user' || order === 'none',
                            'fa-sort-up': sortBy === 'user' && order === 'asc',
                            'fa-sort-down': sortBy === 'user'
                          && order === 'desc' })}
                        onClick={() => {
                          settingOrder(order);
                          setSortBy('user');
                        }}
                      />
                    </span>
                  </a>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>

                <td data-cy="ProductName">{product.name}</td>
                <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

                <td
                  data-cy="ProductUser"
                  className={product.user.sex === 'm'
                    ? 'has-text-link' : 'has-text-danger'}
                >
                  {product.user.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
    </div>
  );
};

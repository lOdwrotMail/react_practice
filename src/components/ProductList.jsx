/* eslint-disable arrow-body-style */
export const ProductList = ({ products, selectedUser, textFilter }) => {
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
            {filtered.map(product => (
              <tr data-cy="Product">
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

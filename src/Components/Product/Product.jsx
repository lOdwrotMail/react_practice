export const Product = ({ product }) => {
  const { category, user } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy={product.id}>
        {product.id}
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">
        {`${category.icon} - ${category.title}`}
      </td>

      <td
        data-cy="ProductUser"
        className={user.sex === 'm' ? 'has-text-link' : 'has-text-danger'}
      >
        {user.name}
      </td>
    </tr>
  );
};

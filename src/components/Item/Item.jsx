import cn from 'classnames';

export const Item = ({ product }) => {
  const { id, name, category, user } = product;
  const isMale = sex => sex === 'm';
  const isUserMale = isMale(user.sex);

  const userClass = cn({
    'has-text-link': isUserMale,
    'has-text-danger': !isUserMale,
  });

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>

      <td data-cy="ProductCategory">
        {`${category.icon} - ${category.title}`}
      </td>

      <td data-cy="ProductUser" className={userClass}>
        {user.name}
      </td>
    </tr>
  );
};

import { Item } from '../components/Item';
import { Section } from './Section';

export const Table = ({ products }) => {
  const tableSectionNames = ['ID', 'Product', 'Category', 'User'];

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSectionNames.map(sectionName => (
            <Section key={sectionName} sectionName={sectionName} />
          ))}
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <Item
            key={product.id}
            product={product}
          />
        ))

    }
      </tbody>
    </table>
  );
};

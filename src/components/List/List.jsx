import { Table } from '../../Table';

export const List = ({ products }) => (
  <div className="box table-container">
    {products.length
      ? (
        <Table products={products} />
      )
      : (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      )
    }
  </div>
);

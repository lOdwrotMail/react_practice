/* eslint-disable arrow-body-style */
export const CategoriesList = ({ categories,
  selectedCategory, setSelectedCategory }) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={selectedCategory === 'all'
          ? 'button is-success mr-6' : 'button is-success mr-6 is-outlined'}
        onClick={() => setSelectedCategory('all')}
      >
        All
      </a>

      {categories.map(category => (
        <a
          data-cy="Category"
          className={selectedCategory === category
            ? 'button mr-2 my-1 is-info' : 'button mr-2 my-1'}
          href="#/"
          onClick={() => setSelectedCategory(category)}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};

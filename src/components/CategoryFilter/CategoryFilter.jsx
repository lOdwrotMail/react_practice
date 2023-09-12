const CategoryFilter = (
  { chosenCategories, setChosenCategories, categoriesFromServer },
) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className="button is-success mr-6 is-outlined"
    >
      All
    </a>

    {categoriesFromServer.map(category => (
      <a
        key={category.id}
        data-cy="Category"
        className={`button mr-2 my-1 ${chosenCategories.includes(category.id) ? 'is-info' : ''}`}
        href="#/"
        onClick={(event) => {
          event.preventDefault();
          if (chosenCategories.includes(category.id)) {
            setChosenCategories(
              prevState => prevState.filter(
                id => id !== category.id,
              ),
            );
          } else {
            setChosenCategories(
              prevState => [...prevState, category.id],
            );
          }
        }}
      >
        {category.title}
      </a>
    ))}
  </div>
);

export default CategoryFilter;

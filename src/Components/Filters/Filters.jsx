export const Filters = ({ categories, users, get, set }) => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <p className="panel-tabs has-text-weight-bold">
      <a
        className={get.user === -1 ? 'is-active' : ''}
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => set.user(-1)}
      >
        All
      </a>
      {users.map(user => (
        <a
          className={get.user === user.id ? 'is-active' : ''}
          key={user.name}
          data-cy="FilterUser"
          href="#/"
          onClick={() => set.user(user.id)}
        >
          {user.name}
        </a>
      ))}
    </p>

    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={get.name}
          onChange={e => set.name(e.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        <span className="icon is-right">
          {get.name.length > 0 && (
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={e => set.name('')}
            />
          )}
        </span>
      </p>
    </div>

    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={`button is-success mr-6 ${get.category === -1 ? 'is-success' : 'is-outlined'}`}
        onClick={() => set.category(-1)}
      >
        All
      </a>
      {categories.map(category => (
        <a
          key={category.title}
          data-cy="Category"
          className={`button mr-2 my-1 ${get.category === category.id && 'is-info'}`}
          href="#/"
          onClick={() => set.category(category.id)}
        >
          {category.title}
        </a>
      ))}
    </div>

    <div className="panel-block">
      <a
        data-cy="ResetAllButton"
        href="#/"
        className="button is-link is-outlined is-fullwidth"
        onClick={() => {
          set.category(-1);
          set.name('');
          set.user(-1);
        }}
      >
        Reset all filters
      </a>
    </div>
  </nav>
);

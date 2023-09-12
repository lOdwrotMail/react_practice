import React from 'react';
import cn from 'classnames';

export const Filters = React.memo(({
  usersOnClickHandle,
  inputOnChangeHandle,
  filteredProducts,
  categorySelect,
  users,
  selectedUser,
  input,
  categories,
  selectedCategories,
}) => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => usersOnClickHandle({})}
        className={cn({
          'is-active': !selectedUser.name,
        })}
      >
        All
      </a>
      {users.map(user => (
        <a
          key={user.id}
          onClick={() => usersOnClickHandle(user)}
          data-cy="FilterUser"
          href="#/"
          className={cn({
            'is-active': user.id === selectedUser.id,
          })}
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
          value={input}
          onChange={e => inputOnChangeHandle(e.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        <span className="icon is-right">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {input
          && (
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={() => inputOnChangeHandle('')}
          />
          )}
        </span>
      </p>
    </div>

    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        onClick={() => categorySelect([])}
        className={cn('button mr-6 is-success', {
          'is-outlined': selectedCategories.length === 0,
        })}
      >
        All
      </a>
      {categories.map(category => (
        <a
          key={category.id}
          data-cy="Category"
          className={cn('button mr-2 my-1', {
            'is-info': selectedCategories.includes(category),
          })}
          href="#/"
          onClick={() => categorySelect(category)}
        >
          {category.title}
        </a>
      ))}

    </div>

    <div className="panel-block">
      <a
        onClick={() => {
          filteredProducts({}, '', []);
          inputOnChangeHandle('');
        }
        }
        data-cy="ResetAllButton"
        href="#/"
        className="button is-link is-outlined is-fullwidth"
      >
        Reset all filters
      </a>
    </div>
  </nav>
));

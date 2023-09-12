/* eslint-disable arrow-body-style */
export const UserList = ({ users, onUserSelect, selectedUser }) => {
  return (
    <>
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => onUserSelect('all')}
        className={selectedUser === 'all' ? 'is-active' : ''}
      >
        All
      </a>
      {users.map(user => (
        <a
          key={user.id}
          data-cy="FilterUser"
          href="#/"
          className={selectedUser === user ? 'is-active' : ''}
          onClick={() => onUserSelect(user)}
        >
          {user.name}
        </a>
      ))}

    </>
  );
};

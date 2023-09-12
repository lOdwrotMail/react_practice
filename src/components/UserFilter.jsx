export const UserFilter = ({ usersFromServer, pickedUser, setPickedUser }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      onClick={() => setPickedUser(null)}
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        key={user.id}
        data-cy="FilterUser"
        href="#/"
        onClick={() => setPickedUser(user.id)}
        className={pickedUser === user.id ? 'is-active' : ''}
      >
        {user.name}
      </a>
    ))}
  </p>
);

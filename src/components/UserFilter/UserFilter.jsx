const UserFilter = ({ chosenUserId, setChosenUserId, usersFromServer }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      className={!chosenUserId ? 'is-active' : ''}
      onClick={(event) => {
        event.preventDefault();
        setChosenUserId(null);
      }}
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        key={user.id}
        data-cy="FilterUser"
        href="#/"
        className={chosenUserId === user.id ? 'is-active' : ''}
        onClick={(event) => {
          event.preventDefault();
          setChosenUserId(user.id);
        }}
      >
        {user.name}
      </a>
    ))}
  </p>
);

export default UserFilter;

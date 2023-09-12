const ResetFilterButton = ({ resetFilters }) => (
  <div className="panel-block">
    <a
      data-cy="ResetAllButton"
      href="#/"
      className="button is-link is-outlined is-fullwidth"
      onClick={(event) => {
        event.preventDefault();
        resetFilters();
      }}
    >
      Reset all filters
    </a>
  </div>
);

export default ResetFilterButton;

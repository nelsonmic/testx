const PaginationButton = ({ page, setPage, total }) => {
      return (
            <div className="pagination-button">
                  <span> {page}</span>
                  <button
                        onClick={() => setPage(old => Math.max(old - 1, 0))}
                        disabled={page === 1}
                  >
                        {"<"}
                  </button>{' '}
                  <button
                        onClick={() => {
                              if (!(page >= total)) {
                                    setPage(old => old + 1)
                              }
                        }}
                  >
                        {">"}
                  </button>
            </div>
      )
}

export default PaginationButton;
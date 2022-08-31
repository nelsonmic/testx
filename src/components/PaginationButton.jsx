const PaginationButton = ({ page, end, setPage, total }) => {
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
                  <span> {total}</span>
            </div>
      )
}

export default PaginationButton;
import React from "react";

export default ({ pageState, handleClickPagination }) => {
  const { currentPage, totalPage } = pageState;
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={+currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            onClick={() => {
              const nextPageNumber = +currentPage - 1;
              handleClickPagination(nextPageNumber);
            }}
          >
            Previous
          </a>
        </li>
        {Array.from(new Array(totalPage)).map((v, i) => {
          const pageNumber = ++i;
          return (
            <li
              className={
                currentPage === pageNumber ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => handleClickPagination(i)}>
                {pageNumber}
              </a>
            </li>
          );
        })}
        <li
          className={
            +currentPage === +totalPage ? "page-item disabled" : "page-item"
          }
        >
          <a
            className="page-link"
            onClick={() => {
              const nextPageNumber = +currentPage + 1;
              handleClickPagination(nextPageNumber);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

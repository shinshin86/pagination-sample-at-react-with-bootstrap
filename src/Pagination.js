import React from "react";

const Pagination = ({ pageState, handleClickPagination }) => {
  const { currentPage, totalPage } = pageState;
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={+currentPage === 1 ? "page-item disabled" : "page-item"}>
          <span
            className="page-link"
            onClick={() => {
              const nextPageNumber = +currentPage - 1;
              handleClickPagination(nextPageNumber);
            }}
          >
            Previous
          </span>
        </li>
        {Array.from(new Array(totalPage)).map((v, i) => {
          const pageNumber = ++i;
          return (
            <li
              className={
                currentPage === pageNumber ? "page-item active" : "page-item"
              }
              key={i}
            >
              <span className="page-link" onClick={() => handleClickPagination(i)}>
                {pageNumber}
              </span>
            </li>
          );
        })}
        <li
          className={
            +currentPage === +totalPage ? "page-item disabled" : "page-item"
          }
        >
          <span
            className="page-link"
            onClick={() => {
              const nextPageNumber = +currentPage + 1;
              handleClickPagination(nextPageNumber);
            }}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
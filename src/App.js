import React, { useState, useEffect, useCallback } from "react";
import { getTestData } from "./test-data";
import Pagination from "./Pagination";
import Modal from "./Modal";

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [dataCount, setDataCount] = useState(100);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = useCallback(async () => {
    setIsFetching(true);

    // Fetch data
    const offset = (currentPage - 1) * limit;
    const { userList, userCount } = await getTestData({
      limit,
      offset,
      dataCount,
    });

    setUserList(userList);

    // Update pagination state
    const totalPage = Math.ceil(userCount / limit);
    setTotalPage(totalPage);

    setIsFetching(false);
  }, [limit, dataCount, currentPage]);

  const handleClickPagination = useCallback(
    async (nextPageNumber) => {
      setIsFetching(true);

      // Fetch data
      const offset = (nextPageNumber - 1) * limit;
      const { userList, userCount } = await getTestData({
        limit,
        offset,
        dataCount,
      });
      setUserList(userList);

      // Updata pagination state
      const totalPage = Math.ceil(userCount / limit);
      setTotalPage(totalPage);
      setCurrentPage(nextPageNumber);

      setIsFetching(false);
    },
    [limit, dataCount]
  );

  const handleSubmitDataResource = async () => {
    await fetchData();
  };

  if (isFetching)
    return (
      <div className="container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container">
      <h1 className="text-center">Pagination Sample</h1>
      <div className="m-3 text-center">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#dataModal"
        >
          Launch data modal
        </button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Admin</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handleClickPagination={handleClickPagination}
        />
      </div>
      <Modal
        limit={limit}
        dataCount={dataCount}
        setLimit={setLimit}
        setDataCount={setDataCount}
        handleSubmitDataResource={handleSubmitDataResource}
      />
    </div>
  );
};

export default App;

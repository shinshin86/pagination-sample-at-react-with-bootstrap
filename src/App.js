import React, { useState, useEffect, useCallback } from "react";
import { getTestData } from "./test-data";
import Pagination from "./Pagination";

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userList, setUsetList] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [maxPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      // Fetch data
      const offset = (currentPage - 1) * maxPerPage;
      const { userList, userCount } = await getTestData({ offset });
      setUsetList(userList);

      // Update pagination state
      const totalPage = Math.ceil(userCount / maxPerPage);
      setTotalPage(totalPage);

      setIsFetching(false);
    };

    fetchData();
  }, [currentPage, maxPerPage]);

  const handleClickPagination = useCallback(async (nextPageNumber) => {
    setIsFetching(true);

    // Fetch data
    const offset = (nextPageNumber - 1) * maxPerPage;
    const { userList, userCount } = await getTestData({ offset });
    setUsetList(userList);

    // Updata pagination state
    const totalPage = Math.ceil(userCount / maxPerPage);
    setTotalPage(totalPage);
    setCurrentPage(nextPageNumber);

    setIsFetching(false);
  }, [maxPerPage]);

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="text-center">Pagination Sample</h1>
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
            {userList.map(user => (
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
    </div>
  );
}

export default App;
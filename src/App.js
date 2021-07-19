import React, { useState, useEffect } from "react";
import { getTestData } from "./test-data";
import Pagination from "./Pagination";

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userList, setUsetList] = useState([]);
  const [pageState, setPageState] = useState({
    currentPage: 1,
    totalPage: 0,
    maxPerPage: 20
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      // Fetch data
      const offset = (pageState.currentPage - 1) * pageState.maxPerPage;
      const { userList, userCount } = await getTestData({ offset });
      setUsetList(userList);

      // Update pagination state
      const totalPage = Math.ceil(userCount / pageState.maxPerPage);

      const updatePageState = Object.assign({ ...pageState }, { totalPage });
      setPageState(updatePageState);

      setIsFetching(false);
    };

    fetchData();
  }, []);

  const handleClickPagination = async nextPageNumber => {
    setIsFetching(true);

    // Fetch data
    const offset = (nextPageNumber - 1) * pageState.maxPerPage;
    const { userList, userCount } = await getTestData({ offset });
    setUsetList(userList);
    setIsFetching(false);

    // Updata pagination state
    const totalPage = Math.ceil(userCount / pageState.maxPerPage);
    setPageState(
      Object.assign(
        { ...pageState },
        { totalPage, currentPage: nextPageNumber }
      )
    );
  };

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
          pageState={pageState}
          handleClickPagination={handleClickPagination}
        />
      </div>
    </div>
  );
}

export default App;
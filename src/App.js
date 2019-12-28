import React, { useState, useEffect } from "react";
import { getTestData } from "./test-data";
import "./App.css";
import Pagination from "./Pagination";

export default function() {
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

      await getTestData();
      const data = await getTestData();
      setUsetList(data);
      setIsFetching(false);
      const totalPage = Math.ceil(data.length / pageState.maxPerPage);
      setPageState(Object.assign({ ...pageState }, { totalPage }));
    };

    fetchData();
  }, []);

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Pagination Sample</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Admin</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => {
              const dataRangeMin =
                +pageState.maxPerPage * (pageState.currentPage - 1);
              const dataRangeMax =
                +pageState.maxPerPage * pageState.currentPage;
              return (
                dataRangeMin <= index &&
                dataRangeMax > index && (
                  <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
        <Pagination pageState={pageState} setPageState={setPageState} />
      </div>
    </div>
  );
}

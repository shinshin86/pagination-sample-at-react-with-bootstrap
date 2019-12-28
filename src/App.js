import React, { useState, useEffect } from "react";
import { getTestData } from "./test-data";
import "./App.css";

export default function() {
  const [userList, setUsetList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getTestData();
      const data = await getTestData();
      setUsetList(data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Pagination Sample</h1>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Admin</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

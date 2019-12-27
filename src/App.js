import React, { useState, useEffect } from 'react';
import { getTestData } from './test-data';
import './App.css';

export default function() {
  const [userList, setUsetList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getTestData();
      const data = await getTestData();
      setUsetList(data)
    }

    fetchData();
  }, [])
  
  return (
    <div className="App">
      <h1>Pagination Sample</h1>
      <div className='container'>
        <ul className="list-group">
          {userList.map(user => (
            <li className="list-group-item" key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

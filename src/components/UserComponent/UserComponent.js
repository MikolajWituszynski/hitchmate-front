import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/photos')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;

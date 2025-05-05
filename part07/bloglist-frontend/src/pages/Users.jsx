import { useEffect, useState } from "react";
import usersService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await usersService.getAllUsers();
        setUsers(resp);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

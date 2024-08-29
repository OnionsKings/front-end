import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/users/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('获取用户列表失败:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  if (error) {
    return <div>错误: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;
  }

  return (
    <div className="user-management">
      <h2>用户管理</h2>
      {users.length === 0 ? (
        <p>加载中...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>用户类型</th>
              <th>密码</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || '未知'}</td>
                <td>{user.userType || '未知'}</td>
                <td>{user.password || '未知'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', password: '', userType: 'normal' });

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

  const handleUpdateUserType = async (userId, newUserType) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://localhost:8080/users/${userId}/type?newUserType=${newUserType}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAllUsers();
    } catch (error) {
      console.error('更新用户类型失败:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAllUsers();
    } catch (error) {
      console.error('删除用户失败:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      await axios.post('http://localhost:8080/users/createNormalUser', newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAllUsers();
      setNewUser({ name: '', password: '', userType: 'normal' });
    } catch (error) {
      console.error('添加用户失败:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  if (error) {
    return <div>错误: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;
  }

  return (
    <div className="user-management">
      <h2>用户管理</h2>
      <h3>创建新用户</h3>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="用户名"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="password"
          placeholder="密码"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.userType}
          onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
        >
          <option value="normal">普通用户</option>
          <option value="bookAdmin">图书管理员</option>
          <option value="systemAdmin">系统管理员</option>
        </select>
        <button type="submit">添加用户</button>
      </form>
     <h3 align="center">用户列表</h3>
      {users.length === 0 ? (
        <p>加载中...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>用户类型</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || '未知'}</td>
                <td>
                  <select
                    value={user.userType}
                    onChange={(e) => handleUpdateUserType(user.id, e.target.value)}
                  >
                    <option value="normal">普通用户</option>
                    <option value="bookAdmin">图书管理员</option>
                    <option value="systemAdmin">系统管理员</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagement;
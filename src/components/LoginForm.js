import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/login', null, {
        params: { name: username, password: password }
      });
      console.log('登录响应:', response.data);
      if (response.data.token && response.data.userType) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userType', response.data.userType);
        console.log('存储的token:', response.data.token);
        alert('登录成功！');
        navigateToDashboard(response.data.userType);
      } else {
        alert('登录响应格式不正确');
      }
    } catch (error) {
      console.error('登录错误:', error);
      alert('登录失败：' + (error.response?.data || error.message));
    }
  };

  const navigateToDashboard = (userType) => {
    switch(userType) {
      case 'normal':
        navigate('/normal-user-dashboard');
        break;
      case 'bookAdmin':
        navigate('/book-admin-dashboard');
        break;
      case 'systemAdmin':
        navigate('/system-admin-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <div className="login-form">
      <div className="form-item">
        <label>用户名：</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div className="form-item">
        <label>密码：</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button className="btn" onClick={handleLogin}>登录</button>
    </div>
  );
}

export default LoginForm;

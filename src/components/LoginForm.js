import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    let formData = new URLSearchParams();
    formData.append('name', username);
    formData.append('password', password);

    axios.post('http://localhost:8080/users/login', formData)
      .then(response => {
        console.log('Login successful:', response.data);
        sessionStorage.setItem('sessionId', response.data);
        alert('登录成功！');
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('登录失败');
      });
  };

  return (
    <div className="login-form">
      <div className="user-form form-item">
        <div className="text-tips">
          <span>账号</span>
        </div>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div className="password-form form-item">
        <div className="text-tips">
          <span>密码</span>
        </div>
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

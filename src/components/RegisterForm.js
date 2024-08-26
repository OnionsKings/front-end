import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('密码不匹配！');
      return;
    }

    axios.post('http://localhost:8080/users/createNormalUser', {
      name: username,
      password: password
    })
      .then(response => {
        console.log('Registration successful:', response.data);
        alert('注册成功！');
      })
      .catch(error => {
        console.error('Registration error:', error);
        alert('注册失败！');
      });
  };

  return (
    <div className="register-form">
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
      <div className="password-form form-item">
        <div className="text-tips">
          <span>确认密码</span>
        </div>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
      </div>
      <button className="btn" onClick={handleRegister}>注册</button>
    </div>
  );
}

export default RegisterForm;

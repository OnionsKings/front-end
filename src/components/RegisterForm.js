import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('normalUser');
  const [verificationCode, setVerificationCode] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('密码不匹配！');
      return;
    }

    if ((userType === 'bookAdmin' || userType === 'systemAdmin') && !verificationCode) {
      alert('管理员用户需要输入验证码！');
      return;
    }

    let url = '';
    let data = { name: username, password: password };

    switch (userType) {
      case 'normalUser':
        url = 'http://localhost:8080/users/createNormalUser';
        data.type = 'normal';
        break;
      case 'bookAdmin':
        url = 'http://localhost:8080/users/createBookAdmin';
        data.type = 'bookAdmin';
        data.verificationCode = verificationCode;
        break;
      case 'systemAdmin':
        url = 'http://localhost:8080/users/createSystemAdmin';
        data.type = 'systemAdmin';
        data.verificationCode = verificationCode;
        break;
      default:
        alert('无效的用户类型');
        return;
    }

    axios.post(url, data)
      .then(response => {
        console.log('注册成功:', response.data);
        alert('注册成功！');
      })
      .catch(error => {
        console.error('注册错误:', error);
        alert('注册失败：' + (error.response?.data || error.message));
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
      <div className="user-type-form form-item">
        <div className="text-tips">
          <span>用户类型</span>
        </div>
        <select 
          value={userType} 
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="normalUser">普通用户</option>
          <option value="bookAdmin">图书管理员</option>
          <option value="systemAdmin">系统管理员</option>
        </select>
      </div>
      
      {(userType === 'bookAdmin' || userType === 'systemAdmin') && (
        <div className="verification-form form-item">
          <div className="text-tips">
            <span>验证码</span>
          </div>
          <input 
            type="text" 
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)} 
          />
        </div>
      )}
      
      <button className="btn" onClick={handleRegister}>注册</button>
    </div>
  );
}

export default RegisterForm;

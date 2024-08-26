import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      <div className="box">
        <div className="content">
          <div className="logo-and-form">
          {/* for src, can just start with /, no need ../public/ */}
          <img className="logo-img" src="/images/foshandaxue.png" alt="Foshan University Logo" />
            <div className="login-wrapper">
              <div className="top-tips">
                <span>图书借阅管理系统</span>
                <span className="top-tips-span" onClick={toggleForm}>{isLogin ? '注册' : '登录'}</span>
              </div>
              <h1 className="h1-text">{isLogin ? '登录' : '注册'}</h1>
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

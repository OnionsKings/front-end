import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NormalUserDashboard from './components/NormalUserDashboard';
import BookAdminDashboard from './components/BookAdminDashboard';
import SystemAdminDashboard from './components/SystemAdminDashboard';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);  
  };
 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div className="box">
        <div className="content">
          <div className="logo-and-form">
          {/* <img className="logo-img" src="/images/foshandaxue.png"/> */}
           <div className="content" style={{ height: isLogin ? '70vh' : '76vh' }}>
            <div className="login-wrapper" style={{ height: isLogin ? '60vh' : '65vh' }}>
               <div className="top-tips">
                <span>图书借阅管理系统</span>
                <span className="top-tips-span" onClick={toggleForm}>{isLogin ? '注册' : '登录'}</span>
               </div>
              <h1 className="h1-text">{isLogin ? '登录' : '注册'}</h1>
              <div style={{ display: isLogin ? 'block' : 'none' }}>
                <LoginForm />
              </div>
              <div style={{ display: isLogin ? 'none' : 'block' }}>
                <RegisterForm />
              </div>
             </div>
            </div>
          </div>
        </div>
       </div>} />

      <Route path="/normal-user-dashboard" element={<NormalUserDashboard />} />
      <Route path="/book-admin-dashboard" element={<BookAdminDashboard />} />
      <Route path="/system-admin-dashboard" element={<SystemAdminDashboard />} />
      </Routes>
      
    </div>
  );
}

export default App;

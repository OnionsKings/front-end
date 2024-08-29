import React, { useState } from 'react';
import './Dashboard.css';
import BookManagement from './BookManagement';
import { useNavigate } from 'react-router-dom';

function BookAdminDashboard() {
  const [selectedMenu, setSelectedMenu] = useState('欢迎');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedMenu) {
      case '图书管理':
        return <BookManagement />;
      case '借书管理':
        return <p>这里是借书管理的内容</p>;
      case '借书记录':
        return <p>这里是所有用户的借书记录</p>;
      default:
        return <p>欢迎来到图书管理系统</p>;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userType');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {['图书管理', '借书管理', '借书记录'].map((item) => (
          <div
            key={item}
            className={`menu-item ${selectedMenu === item ? 'active' : ''}`}
            onClick={() => setSelectedMenu(item)}
          >
            {item}
          </div>
        ))}
        <div className="menu-item logout-button" onClick={handleLogout}>
          登出
        </div>
      </div>
      <div className="main-content">
        <h1>{selectedMenu}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default BookAdminDashboard;
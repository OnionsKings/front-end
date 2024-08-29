import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import BookBorrowManagement from './BookBorrowManagement';

function NormalUserDashboard() {
  const [selectedMenu, setSelectedMenu] = useState('欢迎');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedMenu) {
      case '借书管理':
        return <BookBorrowManagement />;
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
        {['借书管理'].map((item) => (
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

export default NormalUserDashboard;
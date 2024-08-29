import React, { useState } from 'react';
import './Dashboard.css';
import BookManagement from './BookManagement';
import BookStatusList from './BookStatusList';
import StatisticsAnalysis from './StatisticsAnalysis';
import { useNavigate } from 'react-router-dom';

function BookAdminDashboard() {
  const [selectedMenu, setSelectedMenu] = useState('借书管理');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedMenu) {
      case '图书管理':
        return <BookManagement />;
      case '借书管理':
        return <BookStatusList />;
      case '统计分析':
        return <StatisticsAnalysis />;
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
        {['图书管理', '借书管理', '统计分析'].map((item) => (
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
// Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css'; // 确保你有一个CSS文件来样式化这个组件

function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('欢迎');

  const renderContent = () => {
    switch (selectedMenu) {
      case '图书管理':
        return <p>这里是图书管理的内容</p>;
      case '借书管理':
        return <p>这里是借书管理的内容</p>;
      case '图书馆通知':
        return <p>这里是图书馆通知的内容</p>;
      case '系统管理':
        return <p>这里是系统管理的内容</p>;
      case '统计分析':
        return <p>这里是统计分析的内容</p>;
      default:
        return <p>欢迎来到图书管理系统</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {['图书管理', '借书管理', '图书馆通知', '系统管理', '统计分析'].map((item) => (
          <div
            key={item}
            className={`menu-item ${selectedMenu === item ? 'active' : ''}`}
            onClick={() => setSelectedMenu(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="main-content">
        <h1>{selectedMenu}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;

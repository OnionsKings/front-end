// Dashboard.js
import React, { useEffect } from 'react';
import './Dashboard.css'; // 确保你有一个CSS文件来样式化这个组件

function Dashboard() {
    useEffect(() => {
        console.log('useEffect running');
        document.querySelectorAll('#root > *:not(.dashboard-container)').forEach(el => {
          el.style.display = 'none';
        });
        // document.querySelector('.some-other-class').style.display = 'none';
      }, []);      
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="menu-item">图书管理</div>
        <div className="menu-item">借书管理</div>
        <div className="menu-item">图书馆通知</div>
        <div className="menu-item">系统管理</div>
        <div className="menu-item">统计分析</div>
      </div>
      <div className="main-content">
        <h1>欢迎来到图书管理系统</h1>
        <p>这里是一些动态内容...</p>
      </div>
    </div>
  );
}

export default Dashboard;

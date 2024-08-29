import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './StatisticsAnalysis.css';

function StatisticsAnalysis() {
  const [bookStats, setBookStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    availableBooks: 0,
    borrowRate: '0%',
    topBorrowedBooks: []
  });
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const fetchBookStatistics = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/books/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookStats(response.data);
    } catch (error) {
      console.error('获取图书统计数据失败:', error);
      setError('获取图书统计数据失败');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      fetchBookStatistics();
    }, 0);
    return () => {
      clearTimeout(timer);
      console.log('StatisticsAnalysis unmounted');
    };
  }, [fetchBookStatistics]);

  if (!isReady) return null;
  if (error) return <div className="error-message">{error}</div>;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieChartData = [
    { name: '已借出', value: bookStats.borrowedBooks },
    { name: '可借阅', value: bookStats.availableBooks }
  ];

  return (
    <div className="statistics-analysis">
      <h2 className="title">图书统计分析</h2>
      <div className="summary">
        {[
          { label: '总藏书量', value: bookStats.totalBooks },
          { label: '已借出', value: bookStats.borrowedBooks },
          { label: '可借阅', value: bookStats.availableBooks },
          { label: '借阅率', value: bookStats.borrowRate }
        ].map((item) => (
          <div key={item.label} className="stat-item">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>
      
      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>借阅量前10的图书</h3>
          <ResponsiveContainer width="100%" height={400} debounce={1}>
            <BarChart data={bookStats.topBorrowedBooks || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="borrowCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h3>图书借阅状态分布</h3>
          <ResponsiveContainer width="100%" height={300} debounce={1}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatisticsAnalysis;
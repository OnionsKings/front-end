import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookStatusList.css';

function BookStatusList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllBooksWithStatus();
  }, []);

  const fetchAllBooksWithStatus = async () => {
    try {
      const token = sessionStorage.getItem('token');
      console.log('Fetching with token:', token);
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('http://localhost:8080/books/all-with-status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Received books:', response.data);
      setBooks(response.data);
    } catch (error) {
      console.error('获取图书状态失败:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="book-status-list">
      <h2>图书借阅状态</h2>
      {books.length === 0 ? (
        <p>加载中...</p>
      ) : (
        <table className="book-status-table">
          <thead>
            <tr>
              <th>书名</th>
              <th>作者</th>
              <th>ISBN</th>
              <th>状态</th>
              <th>借阅者</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.borrowed ? '已借出' : '可借阅'}</td>
                <td>{book.borrowerName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookStatusList;
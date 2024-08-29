import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookBorrowManagement.css';

function BookBorrowManagement() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowDays, setBorrowDays] = useState(7);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailableBooks();
    fetchBorrowedBooks();
  }, []);

  const fetchAvailableBooks = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/books/available', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableBooks(response.data);
    } catch (error) {
      setError('获取可借阅图书失败');
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/books/all-with-status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBorrowedBooks(response.data.filter(book => book.borrowed));
    } catch (error) {
      setError('获取已借阅图书失败');
    }
  };

  const handleBorrow = async (book) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://localhost:8080/books/borrow/${book.isbn}`, 
        { days: borrowDays },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAvailableBooks();
      fetchBorrowedBooks();
    } catch (error) {
      setError('借阅图书失败');
    }
  };

  const handleReturn = async (book) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://localhost:8080/books/return/${book.isbn}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAvailableBooks();
      fetchBorrowedBooks();
    } catch (error) {
      setError('归还图书失败');
    }
  };

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <div className="book-borrow-management">
      <h2>可借阅图书</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>书名</th>
            <th>作者</th>
            <th>ISBN</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {availableBooks.map(book => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <input
                  type="number"
                  className="borrow-input"
                  value={borrowDays}
                  onChange={(e) => setBorrowDays(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button className="borrow-button" onClick={() => handleBorrow(book)}>借阅</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>已借阅图书</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>书名</th>
            <th>作者</th>
            <th>ISBN</th>
            <th>借阅日期</th>
            <th>借阅天数</th>
            <th>剩余天数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map(book => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.borrowDate}</td>
              <td>{book.borrowDays}</td>
              <td>{book.daysLeft !== undefined ? `${book.daysLeft}天` : '-'}</td>
              <td>
                <button className="return-button" onClick={() => handleReturn(book)}>归还</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookBorrowManagement;
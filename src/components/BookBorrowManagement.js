import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookBorrowManagement.css';

function BookBorrowManagement() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowDays, setBorrowDays] = useState(7);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      const response = await axios.post(`http://localhost:8080/books/return/${book.isbn}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('归还成功:', response.data);
      fetchAvailableBooks();
      fetchBorrowedBooks();
    } catch (error) {
      console.error('归还图书失败:', error.response ? error.response.data : error.message);
      setError(`归还图书失败: ${error.response ? error.response.data : error.message}`);
    }
  };

  const filteredAvailableBooks = availableBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const filteredBorrowedBooks = borrowedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <div className="book-borrow-management">
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索图书..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
          {filteredAvailableBooks.map(book => (
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
                  placeholder='请输入借阅天数'
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
          {filteredBorrowedBooks.map(book => (
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
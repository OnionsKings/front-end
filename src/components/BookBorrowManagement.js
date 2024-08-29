import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookBorrowManagement() {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books/available`);
      setBooks(response.data);
    } catch (error) {
      console.error('获取图书列表失败:', error);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/books/borrowed`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error('获取已借阅图书列表失败:', error);
    }
  };

  const handleBorrow = async (isbn) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${BASE_URL}/books/borrow/${isbn}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      console.error('借阅图书失败:', error);
    }
  };

  const handleReturn = async (isbn) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`${BASE_URL}/books/return/${isbn}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      console.error('归还图书失败:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  return (
    <div className="book-borrow-management">
      <h2>图书借阅管理</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索图书..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3>可借阅图书</h3>
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
          {filteredBooks.map(book => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button onClick={() => handleBorrow(book.isbn)}>借阅</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>已借阅图书</h3>
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
          {borrowedBooks.map(book => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button onClick={() => handleReturn(book.isbn)}>归还</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookBorrowManagement;
import React, { useState, useEffect } from 'react';
import './BookManagement.css';
import EditBookForm from './EditBookForm';

function BookManagement() {
  // 后端测试URL
  const BASE_URL = 'http://localhost:8080';
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(BASE_URL + '/books');
      console.log('response is ' + response);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('获取图书列表失败:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch(BASE_URL + '/books/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      });
      if (response.ok) {
        console.log('添加图书成功');
        fetchBooks();
        setNewBook({ title: '', author: '', isbn: '' });
      } else {
        console.error('添加图书失败:', response.statusText);
      }
    } catch (error) {
      console.error('添加图书失败:', error);
    }
  };

  const handleDeleteBook = async (isbn) => {
    try {
      const response = await fetch(BASE_URL + `/books/${isbn}`, { method: 'DELETE' });
      if (response.ok) {
        fetchBooks();
      }
    } catch (error) {
      console.error('删除图书失败:', error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      const response = await fetch(BASE_URL + `/books/${updatedBook.isbn}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      });
      if (response.ok) {
        fetchBooks();
        setEditingBook(null);
      }
    } catch (error) {
      console.error('更新图书失败:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  return (
    <div className="book-management">
      <h2>图书管理</h2>
      
      <div className="add-book-form">
        <input
          type="text"
          placeholder="书名"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="作者"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={newBook.isbn}
          onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
        />
        <button onClick={handleAddBook}>添加图书</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索图书..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {editingBook ? (
        <EditBookForm 
          book={editingBook} 
          onUpdate={handleUpdateBook} 
          onCancel={() => setEditingBook(null)}
        />
      ) : (
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
                  <button className="edit-btn" onClick={() => handleEditBook(book)}>编辑</button>
                  <button className="delete-btn" onClick={() => handleDeleteBook(book.isbn)}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookManagement;
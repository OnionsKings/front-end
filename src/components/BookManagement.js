import React, { useState, useEffect } from 'react';
import './BookManagement.css';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 这里应该从后端 API 获取图书列表
    // 暂时使用模拟数据
    setBooks([
      { id: 1, title: '三体', author: '刘慈欣', isbn: '9787536692930' },
      { id: 2, title: '百年孤独', author: '加西亚·马尔克斯', isbn: '9787544253994' },
      { id: 3, title: '1984', author: '乔治·奥威尔', isbn: '9787532751631' },
    ]);
  }, []);

  const handleAddBook = () => {
    // 这里应该调用后端 API 来添加新书
    setBooks([...books, { ...newBook, id: books.length + 1 }]);
    setNewBook({ title: '', author: '', isbn: '' });
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
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button className="edit-btn">编辑</button>
                <button className="delete-btn">删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookManagement;
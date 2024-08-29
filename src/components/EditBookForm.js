import React, { useState } from 'react';
import './EditBookForm.css';

function EditBookForm({ book, onUpdate, onCancel }) {
  const [editedBook, setEditedBook] = useState({ ...book });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedBook);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-book-form">
      <input
        name="title"
        value={editedBook.title}
        onChange={handleChange}
        placeholder="书名"
      />
      <input
        name="author"
        value={editedBook.author}
        onChange={handleChange}
        placeholder="作者"
      />
      <input
        name="isbn"
        value={editedBook.isbn}
        onChange={handleChange}
        placeholder="ISBN"
        // if ISBN can't be changed, uncomment the following line
        // readOnly
      />
      <button type="submit">保存</button>
      <button type="button" onClick={onCancel}>取消</button>
    </form>
  );
}

export default EditBookForm;
import React, { useState } from 'react';
import { createSystemAdmin } from '../services/userService';

const SystemAdminForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const admin = await createSystemAdmin(name, email);
      console.log('Admin created:', admin);
      // 可能的UI反馈
    } catch (error) {
      console.error('Failed to create admin:', error.message);
      // 错误处理
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Create System Admin</button>
    </form>
  );
};

export default SystemAdminForm;

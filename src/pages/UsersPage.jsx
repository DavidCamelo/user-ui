import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import Modal from 'components_ui/Modal';
import Table from 'components_ui/Table';
import Form from 'components_ui/Form';
import './users.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const userColumns = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'lastName', header: 'Last Name' },
  ];

  const userFields = [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
  ];

  const fetchUsers = async () => {
    try {
        setError(null);
        const data = await userService.getUsers();
        setUsers(data);
    } catch (error) {
        setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (user) => {
    try {
        setError(null);
        if (user.id) {
            await userService.updateUser(user.id, user);
        } else {
            await userService.createUser(user);
        }
        fetchUsers();
        setIsModalOpen(false);
        setCurrentItem(null);
    } catch (error) {
        setError(error.message);
    }
  };

  const handleEdit = (user) => {
    setCurrentItem(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            setError(null);
            await userService.deleteUser(id);
            fetchUsers();
        } catch (error) {
            setError(error.message);
        }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setError(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button onClick={() => { setCurrentItem({}); setIsModalOpen(true); }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add User</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCancel} title={currentItem?.id ? 'Edit User' : 'Add User'}>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
          <Form
            fields={userFields}
            initialData={currentItem}
            onSave={handleSave}
            onCancel={handleCancel}
          />
      </Modal>

      <Table columns={userColumns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;

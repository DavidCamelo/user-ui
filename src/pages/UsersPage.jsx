import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import Modal from 'components_ui/Modal';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import './users.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

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
        setCurrentUser(null);
    } catch (error) {
        setError(error.message);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
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
    setCurrentUser(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button onClick={() => { setCurrentUser(null); setIsModalOpen(true); }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add User</button>
      </div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <Modal isOpen={isModalOpen} onClose={handleCancel} title={currentUser ? 'Edit User' : 'Add User'}>
          <UserForm currentUser={currentUser} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;

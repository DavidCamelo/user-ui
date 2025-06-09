import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import Modal from 'components_ui/Modal';
import ConfirmationModal from 'components_ui/ConfirmationModal';
import Table from 'components_ui/Table';
import Form from 'components_ui/Form';
import './users.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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
        setIsFormModalOpen(false);
        setCurrentItem(null);
    } catch (error) {
        setError(error.message);
    }
  };

  const handleEdit = (user) => {
    setCurrentItem(user);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
        try {
            setError(null);
            await userService.deleteUser(itemToDelete);
            fetchUsers();
        } catch (error) {
            setError(error.message);
        } finally {
            setItemToDelete(null);
        }
    }
  };

  const handleCancel = () => {
    setIsFormModalOpen(false);
    setCurrentItem(null);
    setError(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button onClick={() => { setCurrentItem({}); setIsFormModalOpen(true); }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add User</button>
      </div>

      <Modal isOpen={isFormModalOpen} onClose={handleCancel} title={currentItem?.id ? 'Edit User' : 'Add User'}>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
          <Form
            fields={userFields}
            initialData={currentItem}
            onSave={handleSave}
            onCancel={handleCancel}
          />
      </Modal>

      <ConfirmationModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
      >
        Are you sure you want to delete this user? This action cannot be undone.
      </ConfirmationModal>

      <Table columns={userColumns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;

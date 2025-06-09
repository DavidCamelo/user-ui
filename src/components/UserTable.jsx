import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-3 px-4 text-left">ID</th>
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Last Name</th>
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {users.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-4">No users found.</td></tr>
        ) : users.map((user) => (
          <tr key={user.id} className="border-b hover:bg-gray-100">
            <td className="py-3 px-4">{user.id}</td>
            <td className="py-3 px-4">{user.name}</td>
            <td className="py-3 px-4">{user.lastName}</td>
            <td className="py-3 px-4 text-center">
              <button onClick={() => onEdit(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
              <button onClick={() => onDelete(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;

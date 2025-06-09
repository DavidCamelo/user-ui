// API services for interacting with the backend
export const userService = {
  getUsers: async () => {
    const response = await fetch('https://spring-boot.davidcamelo.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },
  createUser: async (user) => {
    const response = await fetch('https://spring-boot.davidcamelo.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create user' }));
      throw new Error(errorData.message || 'Failed to create user');
    }
    return response.json();
  },
  updateUser: async (id, user) => {
    const response = await fetch(`https://spring-boot.davidcamelo.com/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update user' }));
        throw new Error(errorData.message || 'Failed to update user');
    }
    return response.json();
  },
  deleteUser: async (id) => {
    const response = await fetch(`https://spring-boot.davidcamelo.com/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};

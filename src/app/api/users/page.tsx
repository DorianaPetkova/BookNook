"use client";
import { useState, useEffect } from "react";

const UsersPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(data.users || []);
        };

        fetchUsers();
    }, []);

    const openDetailsModal = (user: any) => {
        setSelectedUser(user);
        setIsDetailsModalOpen(true);
    };

    const openEditModal = (user: any) => {
        setSelectedUser(user);
        setEmail(user.email);
        setPassword(''); // Don't pre-fill password for security
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsDetailsModalOpen(false);
        setIsEditModalOpen(false);
    };

    const openAddModal = () => {
        setEmail('');
        setPassword('');
        setIsAddModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedUserData = {
            email,
            password: password || undefined, // Only update password if it's provided
        };

        const res = await fetch(`/api/users/${selectedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        });

        const data = await res.json();
        if (res.ok) {
            alert('User updated successfully!');
            closeModal();
            setUsers(users.map(user => user._id === selectedUser._id ? data.updatedUser : user));
        } else {
            alert(data.error);
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUserData = {
            email,
            password,
        };

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("User added successfully!");
                setIsAddModalOpen(false);
                setUsers([...users, data.user]); 
            } else {
                alert("Failed to add user: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("❌ Error adding user:", error);
            alert("An unexpected error occurred.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });

        if (res.ok) {
            alert('User deleted successfully!');
            setUsers(users.filter(user => user._id !== id));
        } else {
            alert('Failed to delete user');
        }
    };

    return (
        <div>
            <h1>Users List</h1>
            <button onClick={openAddModal}>Add New User</button>

            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => openDetailsModal(user)}>View Details</button>
                                <button onClick={() => openEditModal(user)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* User Details Modal */}
            {isDetailsModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>User Details</h2>
                        <p><strong>Email:</strong> {selectedUser?.email}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>New Password (leave blank to keep current password):</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit">Update User</button>
                        </form>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New User</h2>
                        <form onSubmit={handleAddSubmit}>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit">Add User</button>
                        </form>
                        <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;

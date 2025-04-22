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
        setPassword(''); 
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
            password: password || undefined, 
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
            alert('Успешна операция!');
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
                alert("Успешна операция!");
                setIsAddModalOpen(false);
                setUsers([...users, data.user]); 
            } else {
                alert("Грешка " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Грешка", error);
            alert("Грешка");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Сигурни ли сте, че искате да премахнете потребителя?")) return;

        const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });

        if (res.ok) {
            alert('Успешна операция!');
            setUsers(users.filter(user => user._id !== id));
        } else {
            alert('Грешка');
        }
    };

    return (
        <div className="container-table">
            <h1 className="books-table">Потребители <button className="btn-crud" onClick={openAddModal}>Добави читател</button></h1>
            

            <table>
                <thead>
                    <tr>
                        <th>Имейл</th>
                        <th>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn-edit-details-del" onClick={() => openDetailsModal(user)}>Детайли</button>
                                <button className="btn-edit-details-del" onClick={() => openEditModal(user)}>Промени</button>
                                <button className="btn-edit-details-del" onClick={() => handleDelete(user._id)} style={{ backgroundColor: "#4B4B4", border: "2px solid #FF3A3A", color: "white" }}>Премахни</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* User Details Modal */}
            {isDetailsModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2><b>Детайли</b></h2>
                        <p className=""><strong>Имейл:</strong> {selectedUser?.email}</p>
                        <div className="btn-container">
  <button className="btn-del-1" onClick={closeModal}>Затвори</button>
</div>

                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2><b>Промени</b></h2>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>Имейл:</label>
                                <input className="pole-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Нова парола (остави празно, за да запазиш старата):</label>
                                <input className="pole-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn-add-crud-1" type="submit">Промени</button>
                        </form>
                        <button className="btn-del-1" onClick={closeModal}>Затвори</button>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Добави потребител</h2>
                        <form onSubmit={handleAddSubmit}>
                            <label>Имейл:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Парола:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button className="btn-add-crud-1" type="submit">Добави</button>
                        </form>
                        <button className="btn-del-1" onClick={() => setIsAddModalOpen(false)}>Затвори</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;

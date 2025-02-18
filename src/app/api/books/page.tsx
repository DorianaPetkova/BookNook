"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

const BooksPage = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [selectedBook, setSelectedBook] = useState<any>(null);  // For storing selected book for modals
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [genres, setGenres] = useState<string[]>([]);

    // Fetch books from the API on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            const res = await fetch("/api/books");
            const data = await res.json();
            setBooks(data.books || []);
        };

        fetchBooks();
    }, []);

    const openDetailsModal = (book: any) => {
        setSelectedBook(book);
        setIsDetailsModalOpen(true);
    };

    const openEditModal = (book: any) => {
        setSelectedBook(book);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setPageCount(book.pageCount);
        setGenres(book.genres);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsDetailsModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBookData = {
            title,
            author,
            description,
            pageCount,
            genres,
        };

        const res = await fetch(`/api/books/${selectedBook._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBookData),
        });

        const data = await res.json();
        if (res.ok) {
            alert('Book updated successfully!');
            closeModal();  // Close modal after successful update
            // Optionally, refetch the books list after updating
            setBooks(books.map(book => book._id === selectedBook._id ? data.updatedBook : book));
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <h1>Books List</h1>
            <button>
                <Link href="/books/add">Add New Book</Link>
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button onClick={() => openDetailsModal(book)}>
                                    View Details
                                </button>
                                <button onClick={() => openEditModal(book)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Book Details Modal */}
            {isDetailsModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedBook?.title}</h2>
                        <p><strong>Author:</strong> {selectedBook?.author}</p>
                        <p><strong>Description:</strong> {selectedBook?.description}</p>
                        <p><strong>Pages:</strong> {selectedBook?.pageCount}</p>
                        <p><strong>Genres:</strong> {selectedBook?.genres.join(", ")}</p>
                        <p><strong>Language:</strong> {selectedBook?.language}</p>

                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Edit Book Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Book</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Author:</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Page Count:</label>
                                <input
                                    type="number"
                                    value={pageCount}
                                    onChange={(e) => setPageCount(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label>Genres:</label>
                                <input
                                    type="text"
                                    value={genres.join(", ")}
                                    onChange={(e) => setGenres(e.target.value.split(",").map((genre) => genre.trim()))}
                                />
                            </div>
                            <button type="submit">Update Book</button>
                        </form>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksPage;

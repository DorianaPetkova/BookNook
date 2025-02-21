"use client";
import { useState, useEffect } from "react";
import Link from "next/link";


const BooksPage = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [genres, setGenres] = useState<string[]>([]);
    const [epubUrl, setEpubUrl] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [language, setLanguage] = useState('en');
    const ADMIN_ID = process.env.ADMIN_ID; 
    const [addedByUserId, setAddedByUserId] = useState<string>("");
    
    useEffect(() => {

        setAddedByUserId(process.env.NEXT_PUBLIC_MASTER_ADMIN_ID || "");

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
    const openAddModal = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setPageCount(0);
        setGenres([]);
        setEpubUrl('');
        setCoverImageUrl('');
        setPublishDate('');
        setLanguage('en');
        setIsAddModalOpen(true);
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


    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const newBookData = {
            title,
            author,
            description,
            pageCount,
            genres,
            epubUrl,
            coverImageUrl,
            publishDate,
            language,
            addedByUserId, // Securely fetched from .env
        };
    
        try {
            const res = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBookData),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert("Book added successfully!");
                setIsAddModalOpen(false);
                setBooks([...books, data.book]); 
            } else {
                alert("Failed to add book: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("❌ Error adding book:", error);
            alert("An unexpected error occurred.");
        }
    };
    

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this book?")) return;

        const res = await fetch(`/api/books?id=${id}`, { method: 'DELETE' });

        if (res.ok) {
            alert('Book deleted successfully!');
            setBooks(books.filter(book => book._id !== id));
        } else {
            alert('Failed to delete book');
        }
    };

    return (
        <div className="container-table">
            <h1 className="books-table">Books List <button className="btn-crud" onClick={openAddModal}>Add New User</button></h1>
            

            <table className='table'>
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
                                <button className="btn-edit-details-del" onClick={() => openDetailsModal(book)}>Details</button>
                                <button className="btn-edit-details-del" onClick={() => openEditModal(book)}>Edit</button>
                                <button className="btn-edit-details-del" onClick={() => handleDelete(book._id)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
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

                        <button className="btn-del" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Edit Book Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit</h2>
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
                            <button className="btn-del" type="submit">Update</button>
                        </form>
                        <button className="btn-del" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
       
       

{/* Add Book Modal */}
{isAddModalOpen && (
    <div className="modal">
        <div className="modal-content">
            <h2>Add New Book</h2>
            <form onSubmit={handleAddSubmit}>
                <label>Title:</label>
                <input className="pole-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <br/>
                <label>Author:</label>
                <input className="pole-input" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <br/><label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                <br/><label>Page Count:</label>
                <input className="pole-input" type="number" value={pageCount} onChange={(e) => setPageCount(Number(e.target.value))} required />
                <br/><label>Genres (comma-separated):</label>
                <input className="pole-input" type="text" value={genres.join(", ")} onChange={(e) => setGenres(e.target.value.split(",").map(g => g.trim()))} required />
                <br/><label>Epub URL:</label>
                <input className="pole-input" type="text" value={epubUrl} onChange={(e) => setEpubUrl(e.target.value)} required />
                <br/><label>Cover Image URL:</label>
                <input className="pole-input" type="text" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} />
                <br/><label>Publish Date:</label>
                <input className="pole-input" type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required />
                <br/><label>Language:</label>
                <input className="pole-input" type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
                <button className="btn-del" type="submit">Add Book</button>
            </form>
            <button className="btn-del" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
        </div>
    </div>
)}
        </div>
    );
};

export default BooksPage;

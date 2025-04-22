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
        setLanguage('bg');
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
            alert('Успешна операция!');
            closeModal();  
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
            addedByUserId, 
        };
    
        try {
            const res = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBookData),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert("Успешна операция!");
                setIsAddModalOpen(false);
                setBooks([...books, data.book]); 
            } else {
                alert("Грешка! " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Грешка", error);
            alert("Грешка.");
        }
    };
    

    const handleDelete = async (id: string) => {
        if (!confirm("Сигурни ли сте, че искате да премахнете книгата?")) return;

        const res = await fetch(`/api/books?id=${id}`, { method: 'DELETE' });

        if (res.ok) {
            alert('Успешна операция!');
            setBooks(books.filter(book => book._id !== id));
        } else {
            alert('Грешка');
        }
    };

    return (
        <div className="container-table">
            <h1 className="books-table">Книги <button className="btn-crud" onClick={openAddModal}>Добави книга</button></h1>
            

            <table className='table'>
                <thead>
                    <tr>
                        <th>Заглавие</th>
                        <th>Автор</th>
                        <th>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button className="btn-edit-details-del" onClick={() => openDetailsModal(book)}>Детайли</button>
                                <button className="btn-edit-details-del" onClick={() => openEditModal(book)}>Промени</button>
                                <button className="btn-edit-details-del" onClick={() => handleDelete(book._id)} style={{ backgroundColor: "#4B4B4C", border: "3px solid #FF3A3A", color: "white" }}>Премахни</button>
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
                        <p><strong>Автор:</strong> {selectedBook?.author}</p>
                        <p><strong>Описание:</strong> {selectedBook?.description}</p>
                        <p><strong>Страници:</strong> {selectedBook?.pageCount}</p>
                        <p><strong>Жанр:</strong> {selectedBook?.genres.join(", ")}</p>
                        <p><strong>Език:</strong> {selectedBook?.language}</p>

                        <button className="btn-del-1" onClick={closeModal}>Затвори</button>
                    </div>
                </div>
            )}

            {/* Edit Book Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2><b>Промени</b></h2>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>Заглавие:</label>
                                <input className="pole-input"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Автор:</label>
                                <input className="pole-input"
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Описание:</label>
                                <textarea className="pole-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Страници</label>
                                <input className="pole-input"
                                    type="number"
                                    value={pageCount}
                                    onChange={(e) => setPageCount(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label>Жанр:</label>
                                <input className="pole-input"
                                    type="text"
                                    value={genres.join(", ")}
                                    onChange={(e) => setGenres(e.target.value.split(",").map((genre) => genre.trim()))}
                                />
                            </div>
                            <button className="btn-add-crud-1" type="submit">Промени</button>
                        </form>
                        <button className="btn-del-1" onClick={closeModal}>Затвори</button>
                    </div>
                </div>
            )}
       
       

{/* Add Book Modal */}
{isAddModalOpen && (
    <div className="modal">
        <div className="modal-content">
            <h2>Добави книга</h2>
            <form onSubmit={handleAddSubmit}>
                <label>Заглавие:</label>
                <input className="pole-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <br/>
                <label>Автор:</label>
                <input className="pole-input" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <br/><label>Описание:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                <br/><label>Страници:</label>
                <input className="pole-input" type="number" value={pageCount} onChange={(e) => setPageCount(Number(e.target.value))} required />
                <br/><label>Жанр (със запетаи):</label>
                <input className="pole-input" type="text" value={genres.join(", ")} onChange={(e) => setGenres(e.target.value.split(",").map(g => g.trim()))} required />
                <br/><label>Epub URL:</label>
                <input className="pole-input" type="text" value={epubUrl} onChange={(e) => setEpubUrl(e.target.value)} required />
                <br/><label>Корица URL:</label>
                <input className="pole-input" type="text" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} />
                <br/><label>Дата на издаване:</label>
                <input className="pole-input" type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required />
                <br/><label>Език:</label>
                <input className="pole-input" type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
                <button className="btn-add-crud-1" type="submit">Добави книга</button>
            </form>
            <button className="btn-del-1" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
        </div>
    </div>
)}
        </div>
    );
};

export default BooksPage;

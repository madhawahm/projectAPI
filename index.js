const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database (array of objects)
let books = [
    { id: 1, title: 'Book1', author: 'Author1' },
    { id: 2, title: 'Book2', author: 'Author2' }
];

// Create operation
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json({ message: 'Book added', data: newBook });
});

// Read operation
app.get('/books', (req, res) => {
    res.status(200).json({ data: books });
});

app.get('/books/:book_id', (req, res) => {
    const bookId = parseInt(req.params.book_id);
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.status(200).json({ data: book });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Update operation using PATCH
app.patch('/books/:book_id', (req, res) => {
    const bookId = parseInt(req.params.book_id);
    const updatedFields = req.body;

    let updatedBook = books.find(book => book.id === bookId);

    if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
    }

    updatedBook = { ...updatedBook, ...updatedFields };

    books = books.map(book => book.id === bookId ? updatedBook : book);

    res.status(200).json({ message: 'Book updated', data: updatedBook });
});

// Delete operation
app.delete('/books/:book_id', (req, res) => {
    const bookId = parseInt(req.params.book_id);

    books = books.filter(book => book.id !== bookId);

    res.status(200).json({ message: 'Book deleted' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { config } from 'dotenv';

const app = express();
const port = 3000;

config();
const filename = 'database.db';
console.log(filename);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: filename
});

/**
 * Represents a Book.
 * @class
 * @extends Model
 */
class Book extends Model {}

/**
 * Initializes the Book model.
 */
Book.init({
    /**
     * The author of the book.
     * @type {string}
     */
    autor: DataTypes.STRING,

    /**
     * The ISBN of the book.
     * @type {number}
     */
    isbn: DataTypes.INTEGER,

    /**
     * The editorial of the book.
     * @type {string}
     */
    editorial: DataTypes.STRING,

    /**
     * The number of pages in the book.
     * @type {number}
     */
    paginas: DataTypes.INTEGER
}, { sequelize, modelName: 'book' });

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * GET /books
 * Retrieves all books.
 * @name get/books
 * @function
 * @memberof module:routes/books
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

/**
 * GET /books/:id
 * Retrieves a book by its ID.
 * @name get/books/:id
 * @function
 * @memberof module:routes/books
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
});

/**
 * POST /books
 * Creates a new book.
 * @name post/books
 * @function
 * @memberof module:routes/books
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post('/books', async (req, res) => {
    const book = await Book.create(req.body);
    res.json(book);
});

/**
 * PUT /books/:id
 * Updates a book by its ID.
 * @name put/books/:id
 * @function
 * @memberof module:routes/books
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.put('/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.update(req.body);
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

/**
 * DELETE /books/:id
 * Deletes a book by its ID.
 * @name delete/books/:id
 * @function
 * @memberof module:routes/books
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.delete('/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.json({ message: 'Book deleted' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

/**
 * Starts the server.
 * @name listen
 * @function
 * @memberof module:server
 * @inner
 * @param {number} port - Port number for the server to listen on
 * @param {Function} callback - Callback function to execute once the server starts
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

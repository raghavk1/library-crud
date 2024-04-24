const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db');
const auth = require('./controllers/user')
const books = require('./controllers/book')

connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.use('/api/auth', auth);
app.use('/api/books', books);

const PORT = process.env.DEV_PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
    console.log(process.env.DEV_PORT)
}
);

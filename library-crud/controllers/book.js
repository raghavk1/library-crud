const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate');
const { check, validationResult } = require('express-validator');
const Book = require('../models/book');


router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find().sort({ publicationYear: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ msg: 'Book not found' });
      }
  
      res.json(book);
    } catch (err) {
      console.error(err.message);
  
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Book not found' });
      }
  
      res.status(500).send('Server Error');
    }
  });
  

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('author', 'Author is required').not().isEmpty(),
      check('publicationYear', 'Publication Year is required').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, publicationYear } = req.body;

    try {
        const newBook = new Book({
          title,
          author,
          publicationYear,
        });

      const book = await newBook.save();

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const { title, author, publicationYear } = req.body;

  const bookFields = {};
  if (title) bookFields.title = title;
  if (author) bookFields.author = author;
  if (publicationYear) bookFields.publicationYear = publicationYear;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ msg: 'Book not found' });

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: bookFields },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ msg: 'Book not found' });

    await Book.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;

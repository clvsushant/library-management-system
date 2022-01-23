const { Router } = require('express');
const {
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
  getAllBook,
  getLoans,
} = require('./module');
const route = Router();

route.post('/', async (req, res) => {
  try {
    res.status(200).send(await createBook(req.body));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.get('/', async (req, res) => {
  try {
    res.status(200).send(await getAllBook());
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.get('/:bookId', async (req, res) => {
  try {
    res.status(200).send(await getBookById(req.params.bookId));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.post('/:bookId', async (req, res) => {
  try {
    res.status(200).send(await updateBookById(req.params.bookId, req.body));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.delete('/:bookId', async (req, res) => {
  try {
    res.status(200).send(await deleteBookById(req.params.bookId));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.get('/:bookId/history', async (req, res, next) => {
  try {
    const book = await getBookById(req.params.bookId);
    const loans = await getLoans(req.params.bookId);
    await Promise.all([book, loans]).then((results) => {
      res.status(200).send(results);
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = route;

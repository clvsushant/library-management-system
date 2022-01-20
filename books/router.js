const { Router } = require('express');
const {
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
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
    if (await deleteBookById(req.params.bookId))
      res.status(200).send('Book deleted successfully');
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = route;

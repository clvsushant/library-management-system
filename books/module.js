const { bookSchema } = require('./validation');
const { Book } = require('../database');
const { Op } = require('sequelize');

exports.createBook = async (bookPayload) => {
  await bookSchema.validateAsync(bookPayload);
  return await Book.create(bookPayload);
};

exports.getBookById = async (bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) throw new Error('Book not found. Please enter valid ID');
  return book;
};

exports.updateBookById = async (bookId, bookPayload) => {
  // const book = await getBookById(bookId);
  const book = await Book.findByPk(bookId);
  if (!book) throw new Error('Book not found. Please enter valid ID');
  book.set({
    bookTitle: bookPayload.bookTitle,
    bookAuthor: bookPayload.bookAuthor,
  });
  await book.save();
  return book;
};

exports.deleteBookById = async (bookId) => {
  // const book = await getBookById(bookId);
  const book = await Book.findByPk(bookId);
  if (!book) throw new Error('Book not found. Please enter valid ID');
  if (await book.destroy()) return true;
};

exports.getAllBook = async () => {
  const books = await Book.findAll();
  return books;
};

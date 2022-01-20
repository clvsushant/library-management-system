const supertest = require('supertest');
const app = require('../../app');
const { connectToDB } = require('../../database');
const request = supertest(app);

describe('Books tests', () => {
  beforeAll(async () => {
    await connectToDB();
  });

  it('should validate the bookTitle', async () => {
    const response = await request.post('/books').send({
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Title is required');
  });

  it('should validate the bookAuthor', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A Game of Thrones',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Author is required');
  });

  it('should validate the Id inputed by the user', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();

    const bookId = response.body.bookId;

    const response2 = await request.get(`/books/${bookId + 1}`);
    expect(response2.statusCode).toBe(400);
    expect(response2.body.message).toBeDefined;
    expect(response2.body.message).toBe(
      'Book not found. Please enter valid ID'
    );
  });

  //POST /books--------------------------------------------------------------------------
  it('should create a book', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();
    expect(response.body.bookTitle).toBe('A song of ice and fire');
    expect(response.body.bookAuthor).toBe('George R R Martin');
  });

  //GET /books/:id-----------------------------------------------------------------------
  it('Should return the book by id', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A Game of Thrones',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();

    const bookId = response.body.bookId;

    const response2 = await request.get(`/books/${bookId}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.bookId).toBe(bookId);
    expect(response2.body.bookTitle).toBe('A Game of Thrones');
    expect(response2.body.bookAuthor).toBe('George R R Martin');
  });

  //POST /books/:id-----------------------------------------------------------------------
  it('Should update the book by the id', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A Clash of Kings',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();

    const bookId = response.body.bookId;

    const response2 = await request.post(`/books/${bookId}`).send({
      bookTitle: 'A Game of thrones',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);

    const response3 = await request.get(`/books/${bookId}`);
    expect(response3.statusCode).toBe(200);
    expect(response3.body.bookId).toBe(bookId);
    expect(response3.body.bookTitle).toBe('A Game of thrones');
    expect(response3.body.bookAuthor).toBe('George R R Martin');
  });

  //DELETE /books/:id---------------------------------------------------------------------
  it('Should delete the book by the id', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A Clash of Kings',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();

    const bookId = response.body.bookId;

    const response2 = await request.delete(`/books/${bookId}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body).toBe('Book is deleted successfully');

    const response3 = await request.get(`/books/${bookId}`);
    expect(response3.statusCode).toBe(400);
  });

  //GET /books----------------------------------------------------------------------------
  it('Should get all the books in the library', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A Clash of Kings',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();

    const bookId1 = response.body.bookId;

    const response2 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.bookId).toBeDefined();

    const bookId2 = response2.body.bookId;

    const response3 = await request.get('/books');
    expect(response3.statusCode).toBe(200);
    expect(response3.body[0].bookTitle).toBe('A Clash of Kings');
    expect(response3.body[0].bookAuthor).toBe('George R R Martin');
    expect(response3.body[0].bookId).toBe(bookId1);
    expect(response3.body[1].bookTitle).toBe('A song of ice and fire');
    expect(response3.body[1].bookAuthor).toBe('George R R Martin');
    expect(response3.body[1].bookId).toBe(bookId2);
  });
});

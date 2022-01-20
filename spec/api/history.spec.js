const res = require('express/lib/response');
const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

describe('History tests', () => {
  //GET /books/:id/history------------------------------------------------------------------------------------------------
  it('Should get the loan history of the book by its ID', async () => {
    const response0 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response0.statusCode).toBe(200);
    expect(response0.body.bookId).toBeDefined();

    const bookId0 = response0.body.bookId;

    const response = await request.post('/student').send({
      studentName: 'Jonny',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.studentId).toBeDefined();

    const studentId1 = response.body.studentId;

    const response2 = await request.post('/student').send({
      studentName: 'John',
    });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.studentId).toBeDefined();

    const studentId2 = response2.body.studentId;

    const response3 = await request.post('/loanHistory').send({
      bookId: bookId0,
      studentId: studentId1,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.loanId).toBeDefined();

    const loanId1 = response3.body.loanId;

    const response4 = await request.post('/loanHistory').send({
      bookId: bookId0,
      studentId: studentId2,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response4.statusCode).toBe(200);
    expect(response4.body.loanId).toBeDefined();

    const loanId2 = response4.body.loanId;

    const res = await request.get(`/books/${bookId0}/history`);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].loanId).toBe(loanId1);
    expect(res.body[1].loanId).toBe(loanId2);
    expect(res.body[0].student.studentId).toBe(studentId1);
    expect(res.body[1].student.studentId).toBe(studentId2);
    expect(res.body[0].student.studentName).toBe('Jonny');
    expect(res.body[1].student.studentName).toBe('John');
    expect(res.body[0].outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(res.body[1].outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(res.body[0].returnDate).toBe('2020-03-22T00:00:00.000Z');
    expect(res.body[1].returnDate).toBe('2020-03-22T00:00:00.000Z');
  });

  //GET /student/:id/history--------------------------------------------------------------------------------------------------
  it('Should get the loan history of the student by their ID', async () => {
    const response0 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response0.statusCode).toBe(200);
    expect(response0.body.bookId).toBeDefined();

    const bookId1 = response0.body.bookId;

    const response = await request.post('/books').send({
      bookTitle: 'A Game of Thrones',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();

    const bookId2 = response.body.bookId;

    const response2 = await request.post('/student').send({
      studentName: 'John',
    });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.studentId).toBeDefined();

    const studentId = response2.body.studentId;

    const response3 = await request.post('/loanHistory').send({
      bookId: bookId1,
      studentId: studentId,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.loanId).toBeDefined();

    const loanId1 = response3.body.loanId;

    const response4 = await request.post('/loanHistory').send({
      bookId: bookId2,
      studentId: studentId,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response4.statusCode).toBe(200);
    expect(response4.body.loanId).toBeDefined();

    const loanId2 = response4.body.loanId;

    const res = await request.get(`/student/${studentId}/history`);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].loanId).toBe(loanId1);
    expect(res.body[1].loanId).toBe(loanId2);
    expect(res.body[0].book.bookId).toBe(bookId1);
    expect(res.body[1].book.bookId).toBe(bookId2);
    expect(res.body[0].book.bookTitle).toBe('A song of ice and fire');
    expect(res.body[1].book.bookTitle).toBe('A Game of Thrones');
    expect(res.body[0].book.bookAuthor).toBe('George R R Martin');
    expect(res.body[1].book.bookAuthor).toBe('George R R Martin');
    expect(res.body[0].outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(res.body[1].outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(res.body[0].returnDate).toBe('2020-03-22T00:00:00.000Z');
    expect(res.body[1].returnDate).toBe('2020-03-22T00:00:00.000Z');
  });
});

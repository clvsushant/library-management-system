const supertest = require('supertest');
const app = require('../../app');
const { connectToDB } = require('../../database');
const request = supertest(app);

describe('Loans tests', () => {
  beforeAll(async () => {
    await connectToDB();
  });
  //Validating inputs and IDs-------------------------------------------------------------------------
  it('should validate outDate', async () => {
    const response = await request.post('/loanHistory').send({
      bookId: 10,
      studentId: 10,
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('outDate is required');
  });

  it('should validate the Id', async () => {
    const response1 = await request.post('/students').send({
      studentName: 'Jonny',
    });
    expect(response1.statusCode).toBe(200);
    expect(response1.body.studentId).toBeDefined();
    const studentId1 = response1.body.studentId;

    const response2 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);
    const bookId1 = response2.body.bookId;

    const response3 = await request.post('/loanHistory').send({
      bookId: bookId1,
      studentId: studentId1,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.loanId).toBeDefined();

    const loanId = response3.body.loanId;

    const response4 = await request.get(`/loanHistory/${loanId + 1}`);
    expect(response4.statusCode).toBe(400);
    expect(response4.body.message).toBeDefined();
    expect(response4.body.message).toBe(
      'Loan not found. Please enter valid ID'
    );
  });

  //POST /loanHistory------------------------------------------------------------------------------------
  it('should create a loan', async () => {
    const response1 = await request.post('/students').send({
      studentName: 'Jonny',
    });
    expect(response1.statusCode).toBe(200);
    expect(response1.body.studentId).toBeDefined();
    const studentId1 = response1.body.studentId;

    const response2 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);
    const bookId1 = response2.body.bookId;

    const response3 = await request.post('/loanHistory').send({
      bookId: bookId1,
      studentId: studentId1,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.loanId).toBeDefined();
    expect(response3.body.bookId).toBe(bookId1);
    expect(response3.body.studentId).toBe(studentId1);
    expect(response3.body.outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response3.body.returnDate).toBe('2020-03-22T00:00:00.000Z');
  });

  //GET /loanHistory/:id-----------------------------------------------------------------------------------
  it('Should return the loan by id', async () => {
    const response1 = await request.post('/students').send({
      studentName: 'Jonny',
    });
    expect(response1.statusCode).toBe(200);
    expect(response1.body.studentId).toBeDefined();
    const studentId1 = response1.body.studentId;

    const response2 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);
    const bookId1 = response2.body.bookId;

    const response3 = await request.post('/loanHistory').send({
      bookId: bookId1,
      studentId: studentId1,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.loanId).toBeDefined();

    const loanId = response3.body.loanId;

    const response4 = await request.get(`/loanHistory/${loanId}`);
    expect(response4.statusCode).toBe(200);
    expect(response4.body.loanId).toBeDefined();
    expect(response4.body.bookId).toBe(bookId1);
    expect(response4.body.studentId).toBe(studentId1);
    expect(response4.body.outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response4.body.returnDate).toBe('2020-03-22T00:00:00.000Z');
  });

  //POST /loanHistory/:id----------------------------------------------------------------------------------
  it('Should update the loan by the id', async () => {
    const response1 = await request.post('/students').send({
      studentName: 'Jonny',
    });
    expect(response1.statusCode).toBe(200);
    expect(response1.body.studentId).toBeDefined();
    const studentId1 = response1.body.studentId;

    const response2 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);
    const bookId1 = response2.body.bookId;

    const response3 = await request.post('/students').send({
      studentName: 'John',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.studentId).toBeDefined();
    const studentId2 = response3.body.studentId;

    const response4 = await request.post('/books').send({
      bookTitle: 'Fantastic Beasts',
      bookAuthor: 'J K Rowling',
    });
    expect(response4.statusCode).toBe(200);
    const bookId2 = response4.body.bookId;

    const response5 = await request.post('/loanHistory').send({
      bookId: bookId1,
      studentId: studentId1,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response5.statusCode).toBe(200);
    expect(response5.body.loanId).toBeDefined();

    const loanId = response5.body.loanId;

    const response6 = await request.post(`/loanHistory/${loanId}`).send({
      bookId: bookId2,
      studentId: studentId2,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response6.statusCode).toBe(200);

    const response7 = await request.get(`/loanHistory/${loanId}`);
    expect(response7.statusCode).toBe(200);
    expect(response7.body.loanId).toBeDefined();
    expect(response7.body.bookId).toBe(bookId2);
    expect(response7.body.studentId).toBe(studentId2);
    expect(response7.body.outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response7.body.returnDate).toBe('2020-03-22T00:00:00.000Z');
  });

  //DELETE /loanHistory/:id------------------------------------------------------------------------------------
  it('Should delete the book by the id', async () => {
    const response1 = await request.post('/students').send({
      studentName: 'Jonny',
    });
    expect(response1.statusCode).toBe(200);
    expect(response1.body.studentId).toBeDefined();
    const studentId1 = response1.body.studentId;

    const response2 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);
    const bookId1 = response2.body.bookId;

    const response3 = await request.post('/loanHistory').send({
      bookId: bookId1,
      studentId: studentId1,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.loanId).toBeDefined();

    const loanId = response3.body.loanId;

    const response4 = await request.delete(`/loanHistory/${loanId}`);
    expect(response4.statusCode).toBe(200);
    expect(response4.text).toBe('Loan is deleted successfully');

    const response5 = await request.get(`/loanHistory/${loanId}`);
    expect(response5.statusCode).toBe(400);
  });

  //GET /loanHistory--------------------------------------------------------------------------------------------
  it('Should get all the books in the library', async () => {
    const response1 = await request.post('/students').send({
      studentName: 'Jonny',
    });
    expect(response1.statusCode).toBe(200);
    expect(response1.body.studentId).toBeDefined();
    const studentId1 = response1.body.studentId;

    const response2 = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response2.statusCode).toBe(200);
    const bookId1 = response2.body.bookId;

    const response3 = await request.post('/students').send({
      studentName: 'John',
    });
    expect(response3.statusCode).toBe(200);
    expect(response3.body.studentId).toBeDefined();
    const studentId2 = response3.body.studentId;

    const response4 = await request.post('/books').send({
      bookTitle: 'Fantastic Beasts',
      bookAuthor: 'J K Rowling',
    });
    expect(response4.statusCode).toBe(200);
    const bookId2 = response4.body.bookId;

    const response5 = await request.post('/loanHistory').send({
      bookId: bookId1,
      studentId: studentId2,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response5.statusCode).toBe(200);
    expect(response5.body.loanId).toBeDefined();

    const loanId1 = response5.body.loanId;

    const response6 = await request.post('/loanHistory').send({
      bookId: bookId2,
      studentId: studentId1,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response6.statusCode).toBe(200);
    expect(response6.body.loanId).toBeDefined();

    const loanId2 = response6.body.loanId;

    const response7 = await request.get('/loanHistory');
    expect(response7.statusCode).toBe(200);
    expect(response7.body[response7.body.length - 2].bookId).toBe(bookId1);
    expect(response7.body[response7.body.length - 2].studentId).toBe(
      studentId2
    );
    expect(response7.body[response7.body.length - 2].loanId).toBe(loanId1);
    expect(response7.body[response7.body.length - 2].outDate).toBe(
      '2020-03-22T00:00:00.000Z'
    );
    expect(response7.body[response7.body.length - 2].returnDate).toBe(
      '2020-03-22T00:00:00.000Z'
    );
    expect(response7.body[response7.body.length - 1].bookId).toBe(bookId2);
    expect(response7.body[response7.body.length - 1].studentId).toBe(
      studentId1
    );
    expect(response7.body[response7.body.length - 1].loanId).toBe(loanId2);
    expect(response7.body[response7.body.length - 1].outDate).toBe(
      '2020-03-22T00:00:00.000Z'
    );
    expect(response7.body[response7.body.length - 1].returnDate).toBe(
      '2020-03-22T00:00:00.000Z'
    );
  });
});

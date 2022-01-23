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
    const response = await request.post('/loanHistory').send({
      bookId: 10,
      studentId: 10,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();

    const loanId = response.body.loanId;

    const response2 = await request.get(`/loanHistory/${loanId + 1}`);
    expect(response2.statusCode).toBe(400);
    expect(response2.body.message).toBeDefined();
    expect(response2.body.message).toBe(
      'Loan not found. Please enter valid ID'
    );
  });

  //POST /loanHistory------------------------------------------------------------------------------------
  it('should create a loan', async () => {
    const response = await request.post('/loanHistory').send({
      bookId: 10,
      studentId: 10,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();
    expect(response.body.bookId).toBe(10);
    expect(response.body.studentId).toBe(10);
    expect(response.body.outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response.body.returnDate).toBe('2020-03-22T00:00:00.000Z');
  });

  //GET /loanHistory/:id-----------------------------------------------------------------------------------
  it('Should return the loan by id', async () => {
    const response = await request.post('/loanHistory').send({
      bookId: 10,
      studentId: 10,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();

    const loanId = response.body.loanId;

    const response2 = await request.get(`/loanHistory/${loanId}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.loanId).toBeDefined();
    expect(response2.body.bookId).toBe(10);
    expect(response2.body.studentId).toBe(10);
    expect(response2.body.outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response2.body.returnDate).toBe('2020-03-22T00:00:00.000Z');
  });

  //POST /loanHistory/:id----------------------------------------------------------------------------------
  it('Should update the loan by the id', async () => {
    const response = await request.post('/loanHistory').send({
      bookId: 10,
      studentId: 10,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();

    const loanId = response.body.loanId;

    const response2 = await request.post(`/loanHistory/${loanId}`).send({
      bookId: 11,
      studentId: 10,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response2.statusCode).toBe(200);

    const response3 = await request.get(`/loanHistory/${loanId}`);
    expect(response3.statusCode).toBe(200);
    expect(response3.body.loanId).toBeDefined();
    expect(response3.body.bookId).toBe(11);
    expect(response3.body.studentId).toBe(10);
    expect(response3.body.outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response3.body.returnDate).toBe('2020-03-22T00:00:00.000Z');
  });

  //DELETE /loanHistory/:id------------------------------------------------------------------------------------
  it('Should delete the book by the id', async () => {
    const response = await request.post('/loanHistory').send({
      bookId: 11,
      studentId: 10,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();

    const loanId = response.body.loanId;

    const response2 = await request.delete(`/loanHistory/${loanId}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.text).toBe('Loan is deleted successfully');

    const response3 = await request.get(`/loanHistory/${loanId}`);
    expect(response3.statusCode).toBe(400);
  });

  //GET /loanHistory--------------------------------------------------------------------------------------------
  it('Should get all the books in the library', async () => {
    const response = await request.post('/loanHistory').send({
      bookId: 11,
      studentId: 10,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();

    const loanId1 = response.body.loanId;

    const response2 = await request.post('/loanHistory').send({
      bookId: 10,
      studentId: 11,
      outDate: '2020-03-22T00:00:00.000Z',
      returnDate: '2020-03-22T00:00:00.000Z',
    });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.loanId).toBeDefined();

    const loanId2 = response2.body.loanId;

    const response3 = await request.get('/loanHistory');
    expect(response3.statusCode).toBe(200);
    expect(response3.body[0].bookId).toBe(11);
    expect(response3.body[0].studentId).toBe(10);
    expect(response3.body[0].loanId).toBe(loanId1);
    expect(response3.body[0].outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response3.body[0].returnDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response3.body[1].bookId).toBe(10);
    expect(response3.body[1].studentId).toBe(11);
    expect(response3.body[1].loanId).toBe(loanId2);
    expect(response3.body[1].outDate).toBe('2020-03-22T00:00:00.000Z');
    expect(response3.body[1].returnDate).toBe('2020-03-22T00:00:00.000Z');
  });
});

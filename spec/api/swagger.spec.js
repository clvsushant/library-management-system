const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

describe('Swagger tests', function () {
  it('should say hello', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text.startsWith('Welcome')).toBeTrue();
  });
});

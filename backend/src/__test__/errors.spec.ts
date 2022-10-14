import app from 'app';
import { dbConnection } from 'ormconfig';
import request from 'supertest';

const PORT = process.env.PORT || '3001';

let connection: any, server: any;

const headers = {
  'api-key': process.env.API_KEY,
};

beforeAll(async () => {
  connection = await dbConnection();
  server = app.listen(PORT);
});

afterAll(done => {
  connection.close();
  server.close();
  done();
});

describe('Errors tests', () => {
  it('get errors', async () => {
    const response = await request(app).get(`/api/v1/errors`).set(headers);
    expect(response.statusCode).toBe(200);
  });
});

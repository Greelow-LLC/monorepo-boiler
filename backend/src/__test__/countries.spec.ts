import app from 'app';
import { dbConnection } from 'ormconfig';
import request from 'supertest';

const PORT = process.env.PORT || '3001';

let connection: any, server: any;

beforeAll(async () => {
  connection = await dbConnection();
  server = app.listen(PORT);
});

afterAll(done => {
  connection.close();
  server.close();
  done();
});

describe('Countries tests', () => {
  it('get Countries', async () => {
    const response = await request(app).get(`/api/v1/countries`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});

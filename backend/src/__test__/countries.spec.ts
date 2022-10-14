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

describe('Countries tests', () => {
  it('get Countries', async () => {
    const response = await request(app).get(`/api/v1/countries`).set(headers);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
  it('add country', async () => {
    const response = await request(app)
      .post('/api/v1/countries/create')
      .send({
        descri: 'USA',
      })
      .set(headers);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      descri: 'USA',
      id: 1,
    });
  });

  it('add country with empty description', async () => {
    const response = await request(app)
      .post('/api/v1/countries/create')
      .send({
        descri: '',
      })
      .set(headers);
    expect(response.statusCode).toBe(406);
    expect(response.body.message[0]).toBe("Description can't be empty");
  });

  it('add country with description already exists', async () => {
    const response = await request(app)
      .post('/api/v1/countries/create')
      .send({
        descri: 'USA',
      })
      .set(headers);
    expect(response.statusCode).toBe(406);
    expect(response.body.message).toBe(
      'Country already exists with this description',
    );
  });

  it('update country', async () => {
    const response = await request(app)
      .put('/api/v1/countries/update/1')
      .send({
        descri: 'testUpdate',
      })
      .set(headers);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      descri: 'testUpdate',
      id: 1,
    });
  });

  it('delete country', async () => {
    const response = await request(app)
      .delete('/api/v1/countries/delete/1')
      .set(headers);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      descri: 'testUpdate',
      id: 1,
      deletedAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });
  });
});

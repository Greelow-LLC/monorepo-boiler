import app from 'app';
import { dbConnection } from 'ormconfig';
import request from 'supertest';

import { randomBytes } from 'crypto';

const PORT = process.env.PORT || '3001';

let connection: any, server: any, id: number;

const headers = {
  'api-key': process.env.API_KEY,
};

const user = {
  email: randomBytes(16).toString('hex') + '@mail.com',
  firstName: 'test',
  lastName: 'test',
  phone: '12345',
  password: '123456',
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

describe('Users tests', () => {
  it('get Users', async () => {
    const response = await request(app).get(`/api/v1/users`).set(headers);
    expect(response.statusCode).toBe(200);
  });
  it('Register User', async () => {
    const response = await request(app)
      .post(`/api/v1/users/register`)
      .set(headers)
      .send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      user: {
        ...user,
        id: expect.any(Number),
        password: expect.any(String),
        deletedAt: null,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      },
      token: expect.any(String),
    });
    id = response.body.user.id;
  });
  it('Login User', async () => {
    const response = await request(app)
      .post(`/api/v1/users/login`)
      .set(headers)
      .send({ email: user.email, password: user.password });
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      token: expect.any(String),
    });
  });
  it('Get user by ID', async () => {
    const response = await request(app).get(`/api/v1/users/${id}`).set(headers);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      ...user,
      id,
      password: expect.any(String),
    });
  });
  it('update user', async () => {
    const { password, ...restUser } = user;
    const response = await request(app)
      .put(`/api/v1/users/${id}`)
      .send({ password, ...restUser, firstName: 'testUpdate' })
      .set(headers);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      updatedUser: {
        ...user,
        id,
        firstName: 'testUpdate',
      },
      token: expect.any(String),
    });
  });
  it('delete user', async () => {
    const response = await request(app)
      .delete(`/api/v1/users/${id}`)
      .set(headers);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      ...user,
      id,
      firstName: 'testUpdate',
      deletedAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });
  });
});

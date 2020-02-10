import * as request from 'supertest';
import { app } from './index';

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        userId: 1,
        title: 'test is cool'
      });
    expect(res.status).toEqual(201);

    expect(res.body).toHaveProperty('userId');
  });
});

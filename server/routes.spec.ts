const supertest = require('supertest');
import { app } from './server';
const request = supertest(app);

describe('GET Endpoints', () => {
  it('should get the translations', async (done: any) => {
    const res = await request.get('/api/translations');

    expect(res.status).toEqual(202);
    done();
  });
});

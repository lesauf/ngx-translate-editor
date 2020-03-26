const supertest = require('supertest');
import { app } from './server';

const request = supertest(app);

describe('Express Routes', () => {
  it('should get and save the translations', async (done: any) => {
    const getRes = await request.get('/api/translations');

    expect(getRes.status).toEqual(202);

    const postRes = await request.post('/api/translations').send({
      en: { test: 'Test' },
      fr: { test: 'Essai' }
    });
    // .set('Accept', 'application/json')
    // .expect('Content-Type', /json/)
    // .expect(202)
    // .then(response {
    //   if (err) return done(err);
    //   done();
    // });

    expect(postRes.status).toEqual(202);
    expect(postRes.body.message).toExist;
    done();
  });

  // it('responds with json', function() {
  //   return request(app)
  //     .get('/users')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then(response => {
  //         assert(response.body.email, 'foo@bar.com')
  //     })
  // });
});

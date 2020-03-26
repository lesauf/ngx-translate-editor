const supertest = require('supertest');
import { app } from '../server';
import { TranslationsController } from './translations.controller';

const request = supertest(app);
const translationsController = new TranslationsController;
    
describe('TranslationsController', () => {


  it('should exist', () => {
    expect(translationsController).toExist;
  });
});

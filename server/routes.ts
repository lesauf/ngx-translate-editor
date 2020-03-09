const express = require('express');

import { TranslationsController } from './translations/translations.controller';

export const router = express.Router();

router
  .route('/')
  .get(async (req: any, res: any) => res.send({ hello: 'world' }));

router
  .route('/translations')
  .get(async (req: any, res: any) => {
    // const result = await TranslationsController.getTranslations(req, res);
    // console.log(typeof result);
    return await TranslationsController.getTranslations(req, res);
  })
  .post(async (req: any, res: any, next: any) => {
    return await TranslationsController.saveTranslations(req, res, next);
  });

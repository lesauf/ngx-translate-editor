import { SpectatorHttp, createHttpFactory, HttpMethod } from '@ngneat/spectator/jest';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let spectator: SpectatorHttp<ApiService>;
  const createHttp = createHttpFactory({
    service: ApiService,
    mocks: []
  });
  const mockTranslations = {
    'fr': {test: "test"},
    en: {test: "test"}
  }

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created and perform CRUD operations', () => {
    expect(spectator.service).toBeTruthy();
    
    // Create
    spectator.service.createTranslations(mockTranslations);
    const create = spectator.expectOne('api/translations', HttpMethod.POST);
    expect(create.request.body['fr']['test']).toEqual("test");
    
    // Get all
    spectator.service.getTranslations();
    const getAll = spectator.expectOne('api/translations', HttpMethod.GET);
    
    // Get one
    spectator.service.getTranslationByLang('fr');
    const getOne = spectator.expectOne('api/translations/fr', HttpMethod.GET);
    // expect(getOne.request.body['fr']['test']).toEqual("test");
    
    // Update
    spectator.service.updateTranslations(mockTranslations);
    const updateAll = spectator.expectOne('api/translations', HttpMethod.PUT);
    expect(updateAll.request.body['fr']['test']).toEqual("test");
    
    // Delete
    spectator.service.deleteTranslation('fr');
    const deleteOne = spectator.expectOne('api/translations/fr', HttpMethod.DELETE);
    // expect(deleteOne.request.body['fr']['test']).toEqual("test");
  });
});

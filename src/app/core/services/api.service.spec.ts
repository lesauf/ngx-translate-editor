import { TestBed } from '@angular/core/testing';
import { SpectatorHttp, createHttpFactory } from '@ngneat/spectator/jest';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let spectator: SpectatorHttp<ApiService>;
  const createHttp = createHttpFactory({
    service: ApiService,
    mocks: []
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});

import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

describe('HttpErrorHandler', () => {
  let spectator: SpectatorService<HttpErrorHandler>;
  const createService = createServiceFactory({
    service: HttpErrorHandler,
    providers: [MessageService]
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should have createHandleError and handleError methods', () => {
    expect(spectator.service).toBeTruthy();
    
    expect(spectator.service.createHandleError).toExist;
    expect(spectator.service.handleError).toExist;
    
    expect(typeof spectator.service.createHandleError()).toEqual('function');
    expect(typeof spectator.service.handleError()).toEqual('function');
    
  });
});

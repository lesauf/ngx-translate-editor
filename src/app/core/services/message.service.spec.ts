import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let spectator: SpectatorService<MessageService>;
  const createService = createServiceFactory(MessageService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created, add message and clear them all', () => {
    expect(spectator.service).toBeTruthy();
    // The message property should be there
    expect(spectator.service.messages).toExist;
    
    // The add function should be there and update the messages property
    spectator.service.add("Ceci est un test");
    expect(spectator.service.messages.length).toEqual(1);
    
    // The clear function should be there and empty the messages property
    spectator.service.clear();
    expect(spectator.service.messages.length).toEqual(0);
  });
});

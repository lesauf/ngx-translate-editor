import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp
} from '@ngneat/spectator/jest';
import { EditorService } from './editor.service';
import { createServiceFactory } from '@ngneat/spectator';
import { HttpErrorHandler } from '../http-error-handler.service';

describe('EditorService', () => {
  let editorServiceSpectator: SpectatorHttp<EditorService>;
  const createHttp = createHttpFactory({
    service: EditorService,
    mocks: [HttpErrorHandler]
  });

  beforeEach(() => {
    editorServiceSpectator = createHttp();
  });

  it('should be created', () => {
    expect(editorServiceSpectator.service).toBeTruthy();
  });

  describe('#getTranslations', () => {
    it('fetch translations from server', () => {
      editorServiceSpectator.service.getTranslations();
      const req = editorServiceSpectator.expectOne(
        'api/translations',
        HttpMethod.GET
      );
    });
  });

  // it('can test HttpClient.post', () => {
  //   editorServiceSpectator.service.postTodo(1).subscribe();

  //   const req = spectator.expectOne('api/todos', HttpMethod.POST);
  //   expect(req.request.body['id']).toEqual(1);
  // });

  // it('can test current http requests', () => {
  //   spectator.service.getTodos().subscribe();
  //   const reqs = spectator.expectConcurrent([
  //     { url: '/api1/todos', method: HttpMethod.GET },
  //     { URL: '/api2/todos', method: HttpMethod.GET }
  //   ]);

  //   spectator.flushAll(reqs, [{}, {}, {}]);
  // });
});

// describe('getTranslations', () => {
//   it('makes expected calls', () => {
//     const httpTestingController = TestBed.inject(HttpTestingController);
//     service.getTranslations().then(res => {
//       expect(res).toEqual(null);
//     });
//     const req = httpTestingController.expectOne('api/translations');
//     expect(req.request.method).toEqual('GET');
//     req.flush({});
//     httpTestingController.verify();
//   });
// });

import {
  createHttpFactory,
  createServiceFactory,
  HttpMethod,
  SpectatorHttp
} from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { ApiService } from '../core/services/api.service';
import { EditorService } from './editor.service';
import { HttpErrorHandler } from '../core/services/http-error-handler.service';

describe('EditorService', () => {
  let editorServiceSpectator: SpectatorHttp<EditorService>;
  const createHttp = createHttpFactory({
    service: EditorService,
    mocks: [HttpErrorHandler],
    providers: [
      {
        provide: ApiService,
        useValue: {
          getTranslations: () => of({}).toPromise(),
          saveTranslations: (translations: any) =>
            of({ message: 'Translations saved successfully' }).toPromise()
        }
      }
    ]
  });

  beforeEach(() => {
    editorServiceSpectator = createHttp();
  });

  it('should be created', () => {
    expect(editorServiceSpectator.service).toBeTruthy();
  });

  // describe('#getTranslations', () => {
  //   it('should fetch translations from server if session storage empty', () => {
  //     const jsonParse = spyOn(JSON, 'parse');
  //     // const apiService = spyOn(editorServiceSpectator.service..apiService, 'getTranslations()');

  //     editorServiceSpectator.service.getTranslations();

  //     if (sessionStorage.getItem('translations') !== undefined) {
  //       expect(jsonParse).toHaveBeenCalled();
  //     }

  //     sessionStorage.removeItem('translations');
  //     editorServiceSpectator.service.getTranslations();
  //     editorServiceSpectator.expectOne('api/translations', HttpMethod.GET);
  //   });
  // });

  // describe('#saveTranslations', () => {
  //   it('should post translations to the server', () => {
  //     const jsonParse = spyOn(JSON, 'parse');
  //     const mockTranslations = { fr: 'vide', en: 'dummy' };
  //     editorServiceSpectator.service.saveTranslations(mockTranslations);

  //     const req = editorServiceSpectator.expectOne(
  //       'api/translations',
  //       HttpMethod.POST
  //     );
  //     expect(req.request.body['fr']).toEqual('vide');
  //   });
  // });

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

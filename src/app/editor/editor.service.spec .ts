import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EditorService } from './editor.service';
// import { HttpErrorHandler } from '../http-error-handler.service';
import { MessageService } from '../message.service';

jest.mock('@angular/common/http');
jest.mock('../http-error-handler.service');
// jest.mock('../message.service');

describe('EditorService', () => {
  // We declare the variables we'll use for the test Controller and for our Service
  // let messageService: MessageService;
  class HttpErrorHandler {
    private messageService: MessageService;
    handleError;
    createHandleError = function(service: string) {};
  }
  let httpErrorHandler;

  beforeEach(() => {
    let httpClient = new HttpClient(null);
    // const messageService = new MessageService();
    let httpErrorHandler = new HttpErrorHandler();
    let editorService = new EditorService(httpClient, httpErrorHandler);

    // Configure a testing module
    // TestBed.configureTestingModule({
    //   providers: [
    //     HttpErrorHandler,
    //     EditorService,
    //     { provide: MessageService, useValue: messageServiceSpy }
    //   ],
    //   imports: [HttpClientTestingModule]
    // });
    // // We inject our service (which import the HttpClient) and the Test Controller
    // httpTestingController = TestBed.inject(HttpTestingController);
    // messageServiceSpy = TestBed.inject(MessageService);
    // httpErrorHandler = TestBed.inject(HttpErrorHandler);
    // service = TestBed.inject(EditorService);
  });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  it('should be created', () => {
    expect(editorService).toBeTruthy();
  });
});

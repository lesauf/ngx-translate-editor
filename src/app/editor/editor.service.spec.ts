import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { EditorService } from './editor.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../http-error-handler.service';

jest.mock('@angular/common/http');

@Injectable()
class MockHttpErrorHandler {
  createHandleError = function() {};
}

describe('EditorService', () => {
  let service;

  beforeEach(() => {
    let httpClient = new HttpClient(null);
    service = new EditorService(httpClient, {
      createHandleError: function() {}
    });
  });

  it('should run #getTranslations()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.getTranslations();
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #saveTranslations()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.saveTranslations({});
    // expect(service.http.get).toHaveBeenCalled();
  });
});

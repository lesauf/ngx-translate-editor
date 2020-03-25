import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from '../core/services/api.service';
import {
  HttpErrorHandler,
  HandleError
} from '../core/services/http-error-handler.service';
import { Translations } from '../core/translation';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private handleError: HandleError;

  constructor(
    public apiService: ApiService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('EditorService');
  }

  /**
   * Fetch translations from the server
   */
  getTranslations() {
    let translationsPromise: Promise<Translations>;

    try {
      if (window.sessionStorage.getItem('translations') !== undefined) {
        console.log('Fetching translations from session storage');

        translationsPromise = new Promise(function(resolve, reject) {
          resolve(JSON.parse(sessionStorage.getItem('translations')));
        });
      } else {
        console.log('Fetching translations from server');

        translationsPromise = this.apiService.getTranslations();
      }
    } catch (e) {
      this.handleError(e);
    }

    return translationsPromise;
  }

  /**
   * Send translated text to the server for saving on json files
   * @param translations
   */
  saveTranslations(translations): Promise<Translations> {
    let result: Promise<any>;

    try {
      console.log('Saving ...');

      // Store the translations to the session storage
      sessionStorage.setItem('translations', JSON.stringify(translations));

      // return this.http.post('api/translations').toPromise();
      result = this.apiService.createTranslations(translations);
    } catch (e) {
      this.handleError(e);
    }

    return result;
  }
}

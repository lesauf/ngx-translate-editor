import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('EditorService');
  }

  /**
   * Fetch translations from the server
   */
  getTranslations() {
    let translationsObs: Observable<any>;
    if (window.localStorage.getItem('translations') !== undefined) {
      console.log('Fetching translations from local storage');

      translationsObs = of(
        JSON.parse(window.localStorage.getItem('translations'))
      );
    } else {
      console.log('Fetching translations from server');

      translationsObs = this.http.get('api/translations');
    }
    return translationsObs.toPromise();
  }

  /**
   * Send translated text to the server for saving on json files
   * @param translations
   */
  saveTranslations(translations): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log('Saving ...');

    // return this.http.post('api/translations').toPromise();
    return (
      this.http
        .post('api/translations', translations, httpOptions)
        // .pipe(catchError(this.handleError('saveTranslations')))
        .toPromise()
    );
  }
}

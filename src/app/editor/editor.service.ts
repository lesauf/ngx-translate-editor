import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
    return this.http.get('api/get-translations');
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

    return this.http.get('api/get-translations').toPromise();
    // return this.http
    //   .post('api/save-translations', translations, httpOptions)
    //   .pipe(catchError(this.handleError('saveTranslations')));
  }
}

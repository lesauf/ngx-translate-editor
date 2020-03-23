import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Translations } from '../translation';
import { Observable, throwError } from 'rxjs';
import { RequestOptions } from 'https';
import { catchError } from 'rxjs/operators';

/**
 * This service is in charge of all the actual request to the server
 * The results are all converted to promises for easy code reading
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'api/translations';

  constructor(private httpClient: HttpClient) {}

  /**
   * Create the translations to the server for save
   * @param translations
   */
  public createTranslations(translations: Translations) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient
      .post<Translations>(`${this.apiURL}`, translations, httpOptions)
      .toPromise();
  }

  /**
   * Update the translations to the server for save
   * @param translations
   */
  public updateTranslations(translations: Translations) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient
      .put<Translations>(`${this.apiURL}`, translations, httpOptions)
      .toPromise();
  }

  public deleteTranslation(lang: string) {
    return this.httpClient
      .delete<Translations>(`${this.apiURL}/${lang}`)
      .toPromise();
  }

  /**
   * Fetch the translation in the specified language
   * @param lang
   */
  public getTranslationByLang(lang: string) {
    return this.httpClient
      .get<Translations>(`${this.apiURL}/${lang}`)
      .toPromise();
  }

  /**
   * Fetch all the translations in all languages
   */
  getTranslations() {
    return this.httpClient
      .get<Translations>(`${this.apiURL}`)
      .pipe(
        catchError(err => {
          console.error(err);
          // TODO Error handling

          // Rethrow it back to the component
          return throwError(err);
        })
      )
      .toPromise();
  }
}

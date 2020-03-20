import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { EditorService } from './editor/editor.service';
import { HttpErrorHandler } from './core/services/http-error-handler.service';
import { MessageService } from './core/services/message.service';
import { MessagesComponent } from './messages/messages.component';

// Get translations first
export function getTranslations(http: HttpClient) {
  return function() {
    // todo use EditorService
    return http
      .get('api/translations')
      .pipe(
        // Save them in the local storage
        tap(translations =>
          window.sessionStorage.setItem(
            'translations',
            JSON.stringify(translations)
          )
        )
      )
      .toPromise();
  };
}

@NgModule({
  declarations: [AppComponent, EditorComponent, MessagesComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [HttpClient],
      useFactory: getTranslations
    },
    HttpErrorHandler,
    EditorService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

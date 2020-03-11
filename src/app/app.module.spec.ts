// @see https://medium.com/sparkles-blog/angular-testing-snippets-ngmodule-providers-b8e9559587e7
import { TestBed } from '@angular/core/testing';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

describe(`AppModule`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
  });

  it('should import AppComponent', () => {
    expect(() => TestBed.get(AppComponent)).toBeTruthy();
  });

  it('should import EditorComponent', () => {
    expect(() => TestBed.get(EditorComponent)).toBeTruthy();
  });
});

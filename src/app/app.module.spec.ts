// @see https://medium.com/sparkles-blog/angular-testing-snippets-ngmodule-providers-b8e9559587e7
import { TestBed } from '@angular/core/testing';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CustomHttpService } from './custom-http.service';
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

  it('should not define CustomHttpService', () => {
    expect(() => TestBed.get(CustomHttpService)).toThrowError(
      /No provider for/
    );
  });
});

// describe(`AppModule.forRoot()`, () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [AppModule.forRoot()]
//     });
//   });

//   it(`should provide services`, () => {
//     expect(TestBed.get(CustomHttpService)).toBeTruthy();
//   });

//   // it(`should provide a single instance for 'CustomHttp' and 'Http' injection tokens`, () => {
//   //   const http: Http = TestBed.get(Http);
//   //   const customHttp: CustomHttp = TestBed.get(CustomHttp);

//   //   // both should be same instance
//   //   expect(http).toBe(customHttp);

//   //   /* USE CASE: `@Inject(Http)` and `@Inject(CustomHttp)`
//   //    * PROVIDER / MODULE:
//   //    * providers: [ { provide: CustomHttp, useClass: CustomHttp },
//   //    *              { provide: Http, useExisting: CustomHttp } ]
//   //    */
//   // });
// });

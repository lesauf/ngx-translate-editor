import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  createComponentFactory,
  HttpMethod,
  Spectator
} from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';

describe('EditorComponent', () => {
  const mockTranslations = {
    en: {
      'A - Z': 'A - Z',
      'Christian Life': 'Christian Life',
      'Christian Life and Ministry': 'Christian Life and Ministry',
      clm: {
        chairman: 'CLM - Chairman',
        christianLiving: {
          'congregation-bible-study': 'Congregation Bible Study',
          'first-part': 'First Part',
          'second-part': 'Second Part',
          'third-part': 'Third Part',
          title: 'Christian Life Title'
        }
      }
    },
    fr: {
      'A - Z': 'A - Z',
      'Christian Life': 'Vie Chretienne',
      'Christian Life and Ministry': 'Vie Chretienne et Ministere',
      clm: {
        chairman: 'VCM - President',
        christianLiving: {
          'congregation-bible-study': "Etude biblique de l'assemblée",
          'first-part': 'Premiere partie',
          'second-part': 'Deuxieme partie',
          'third-part': 'Troisieme partie',
          title: 'Title Vie Chretienne'
        }
      }
    }
  };

  let editorComponentSpectator: Spectator<EditorComponent>;
  const createComponent = createComponentFactory({
    component: EditorComponent,
    imports: [FormsModule, ReactiveFormsModule],
    providers: [
      {
        provide: EditorService,
        useValue: {
          getTranslations: () => of(mockTranslations).toPromise(),
          saveTranslations: (translations: any) =>
            of(mockTranslations).toPromise()
        }
      }
    ]
  });

  beforeEach(() => {
    editorComponentSpectator = createComponent();
  });

  it('should exist', () => {
    expect(editorComponentSpectator.component).toBeTruthy();
  });

  it('should have a default language', () => {
    expect(editorComponentSpectator.component.defaultLanguage).toBeDefined();
  });

  it('should have the list of languages', () => {
    expect(editorComponentSpectator.component.languages.length).toBeGreaterThan(
      0
    );
  });

  it('should have the list of translations keys', () => {
    expect(
      editorComponentSpectator.component.translationKeys.length
    ).toBeGreaterThan(0);
  });

  it('should build the translation form with the translations keys', () => {
    const formKey = Object.keys(
      editorComponentSpectator.component.translationForm.value
    );
    expect(formKey).toEqual(editorComponentSpectator.component.translationKeys);
  });

  it('should call onSubmit on form submit', () => {
    spyOn(editorComponentSpectator.component, 'onSubmit');
    // .and.callThrough();

    const submitButton = editorComponentSpectator.query(
      'button'
    ) as HTMLButtonElement;
    editorComponentSpectator.click(submitButton);

    expect(editorComponentSpectator.component.onSubmit).toHaveBeenCalled();
  });

  it('should convert back the translations to Ngx form on submit', () => {
    spyOn(
      editorComponentSpectator.component,
      'convertTranslationsToNgxLayout'
    );
    // .and.callThrough();
    spyOn(editorComponentSpectator.component, 'onSubmit').and.callThrough();

    editorComponentSpectator.component.onSubmit();
    expect(
      editorComponentSpectator.component.convertTranslationsToNgxLayout
    ).toHaveBeenCalled();
    expect(
      editorComponentSpectator.component.convertTranslationsToNgxLayout()
    ).toEqual(editorComponentSpectator.component.translations);
  });
});

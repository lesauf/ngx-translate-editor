import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';

describe('EditorComponent', () => {
  let editorService: EditorService;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: EditorService,
          useValue: { getTranslations: () => of({}).toPromise() }
        }
      ]
    }).compileComponents();
    // }));

    // beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    editorService = TestBed.get(EditorService);

    // Mock translations
    component.translations = {
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

    fixture.detectChanges();
  }));

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default language', () => {
    expect(component.defaultLanguage).toBeDefined();
  });

  it('should have the list of languages', () => {
    expect(component.languages.length).toBeGreaterThan(0);
  });

  it('should have the list of translations keys', () => {
    expect(component.translationKeys.length).toBeGreaterThan(0);
  });

  it('should build the translation form with the translations keys', () => {
    const formKey = Object.keys(component.translationForm.value);
    expect(formKey).toEqual(component.translationKeys);
  });

  it('should call onSubmit on form on submit', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should convert back the translations to Ngx form on submit', () => {
    spyOn(component, 'convertTranslationsToNgxLayout').and.callThrough();
    spyOn(component, 'onSubmit').and.callThrough();

    component.onSubmit();
    expect(component.convertTranslationsToNgxLayout).toHaveBeenCalled();
    expect(component.convertTranslationsToNgxLayout()).toEqual(
      component.translations
    );
  });
});

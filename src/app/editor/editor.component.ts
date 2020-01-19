import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  /**
   * Path to i18n files folder
   *
   * @name translationsFolder
   * @type string
   */
  @Input() translationsFolder = '../../assets/i18n';

  /**
   * List of languages
   */
  public languages: string[];

  /**
   * Object containing the translations for each language,
   * combined in the keys
   *
   * @name translations
   */
  public translations = {
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

  public flatTranslations = {};

  public translationKeys: string[];

  public defaultLanguage = 'en';

  public translationForm;

  constructor(private formBuilder: FormBuilder) {
    // Get the languages from the translations
    this.languages = Object.keys(this.translations);

    // Flatten the translation object
    for (const lang in this.translations) {
      if (this.translations.hasOwnProperty(lang)) {
        this.flatTranslations[lang] = {};

        this._flattenTranslations(
          this.translations[lang],
          this.flatTranslations[lang]
        );
      }
    }

    // Get the translations keys from the default language
    this.translationKeys = Object.keys(
      this.flatTranslations[this.defaultLanguage]
    );

    // Build form

    this.languages.forEach(lang => {});
    this.translationForm = this.formBuilder.group(this.flatTranslations);

    console.log('form: ', this.translationForm);
  }

  /**
   *
   */
  ngOnInit() {
    console.log('Flat: ', this.flatTranslations);
  }

  /**
   * Save translations
   *
   * @param translationData form data
   */
  onSubmit(translationData) {
    // Process translations data here
    console.warn('Translations saved', translationData);

    this.translationForm.reset();
  }

  /**
   * Recursive function to convert translations keys as dot notation
   * from the first language.
   * Also remove all the spaces from the keys
   */
  public _flattenTranslations(
    translationsToFlatten: any,
    flatObj: {},
    keychain: string = ''
  ) {
    for (const key in translationsToFlatten) {
      if (translationsToFlatten.hasOwnProperty(key)) {
        // Remove spaces
        const trimmedKey = key.replace(/ /g, '');

        // Current key path as dot notation
        const combinedKey =
          keychain !== '' ? keychain + '.' + trimmedKey : trimmedKey;

        if (typeof translationsToFlatten[key] === 'object') {
          this._flattenTranslations(
            translationsToFlatten[key],
            flatObj,
            combinedKey
          );
        } else {
          flatObj[combinedKey] = translationsToFlatten[key];
        }
      }
    }
  }
}

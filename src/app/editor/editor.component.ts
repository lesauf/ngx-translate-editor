import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as flat from 'flat';
import * as _ from 'lodash';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
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

  /**
   * TranslationForm
   *
   * @type FormGroup
   */
  public translationForm: FormGroup = new FormGroup({});

  /**
   * Translations key used by Ngx-translate.
   * They are retrieved from the default language
   * and synchronized to all the others
   *
   * @name translationKeys
   * @type string[]
   */
  translationKeys: string[];

  /**
   * Default language
   * It is the one appearing first in the form,
   * and also the one defining the translation keys
   */
  defaultLanguage = 'en';

  /**
   * Delimiter to use between subkeys when flattening
   * and unflattening the translations
   *
   * @name delimiter
   * @type string
   */
  delimiter = '.';

  constructor() {
    // First make the sure the default language exist
    if (!this.translations.hasOwnProperty(this.defaultLanguage)) {
      this.defaultLanguage = Object.keys(this.translations)[0];
    }

    // Get the languages from the translations, making sure the default come first
    this.languages = _.union(
      [this.defaultLanguage],
      Object.keys(this.translations)
    );

    // Flatten the translation object to easily get all the translations keys
    const flatTranslations = {};
    for (const lang in this.translations) {
      if (this.translations.hasOwnProperty(lang)) {
        flatTranslations[lang] = flat(this.translations[lang], {
          delimiter: this.delimiter
        });
      }
    }

    // Get the translations keys from the default language
    // They will be applied to the other languages
    this.translationKeys = Object.keys(flatTranslations[this.defaultLanguage]);

    // Build form
    for (const key of this.translationKeys) {
      const keyForm = new FormGroup({});

      for (const lang of this.languages) {
        keyForm.addControl(lang, new FormControl(flatTranslations[lang][key]));
      }

      this.translationForm.addControl(key, keyForm);
    }
  }

  /**
   *
   */
  ngOnInit() {}

  /**
   * Save translations
   *
   */
  onSubmit() {
    const translationData = this.translationForm.value;

    // Process translations data here
    console.warn(
      'Translations to be saved',
      this.convertTranslationsToNgxLayout()
    );
  }

  /**
   * Convert back the translations to the original nested
   * objects format
   */
  convertTranslationsToNgxLayout() {
    const formValues = this.translationForm.value;

    const ngxLayout = {};

    for (const key of this.translationKeys) {
      for (const lang of this.languages) {
        if (!ngxLayout.hasOwnProperty(lang)) {
          ngxLayout[lang] = {};
        }
        ngxLayout[lang][key] = formValues[key][lang];
      }
    }

    return flat.unflatten(ngxLayout, { delimiter: this.delimiter });
  }
}

// const path = require('path');
// const fs = require('fs');

import { Component, OnInit, Input } from '@angular/core';

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

  public translationKeys: string[];

  public flatTranslations = {};

  constructor() {}

  /**
   *
   */
  ngOnInit() {
    // Get the languages
    // this.languages = Object.keys(this.translations);

    // Convert the JSON translations to an iterable array for *ngFor to work

    console.log('Lang:', this.languages);

    for (let lang in this.translations) {
      // console.log(lang);
      // console.log(this.translations);
      // console.log(this.translations[lang]);

      this.flatTranslations[lang] = this.flattenTranslations(
        this.translations[lang]
      );
    }

    console.log('Flat: ', this.flatTranslations);
  }

  /**
   * Recursive function to convert translations keys as point notation
   * from the first language
   */
  public flattenTranslations(_translations: any, keychain: string = '') {
    let flatObj = {};

    for (let key in _translations) {
      const combinedKey = keychain != '' ? keychain + '.' + key : key;
      let value;

      if (typeof _translations[key] === 'object') {
        value = this.flattenTranslations(_translations[key], combinedKey);
      } else {
        value = _translations[key];
      }
      flatObj[combinedKey] = value;
    }

    return flatObj;
  }
}

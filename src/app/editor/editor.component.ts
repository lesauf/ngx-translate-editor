import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
const flatten = require('flat');
import * as _ from 'lodash';

import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  /**
   * Object containing the translations for each language,
   * combined in the keys
   *
   * @name translations
   */
  @Input()
  translations;

  /**
   * List of languages
   */
  public languages: string[];

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
  delimiter = '->';

  constructor(private editorService: EditorService) {}

  async ngOnInit() {
    // Load the translations
    try {
      this.translations = await this.editorService.getTranslations();
      // console.log('Translations: ', this.translations);
    } catch (e) {
      console.error(e);
    }

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
        flatTranslations[lang] = flatten(this.translations[lang], {
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
   * Save translations
   *
   */
  onSubmit() {
    const translationData = this.translationForm.value;

    // Save processed translations data here
    this.editorService
      .saveTranslations(this.convertTranslationsToNgxLayout())
      .then(res => {
        console.log(res['message']);
      });
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

    return flatten.unflatten(ngxLayout, { delimiter: this.delimiter });
  }
}

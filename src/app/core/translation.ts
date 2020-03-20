/**
 * This class define the model for the translations
 * The dynamic properties are for example:
 * {
 *   en: {
 *     key1: text1,
 *     key2: text2,
 *     ...
 *   },
 *   fr: {
 *     key1: texte1,
 *     key2: texte2,
 *     ...
 *   },
 *   ...
 * }
 */
export class Translations {
  [lang: string]: any;
}

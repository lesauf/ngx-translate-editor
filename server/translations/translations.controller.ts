import { FSWatcher } from 'fs';

const fs = require('fs').promises;

/**
 * Controller in charge of saving and fetching the translations
 * from the json files in the filesystem
 */
export class TranslationsController {
  static translationsFolder = process.cwd() + '/src/assets/i18n/';

  /**
   * Retrieve the translations from the service and send them as JSON
   *
   * @type GET
   */
  static async getTranslations(req: any, res: any) {
    let translations: Object = {};

    const files: String[] | Buffer[] | fs.Dirent[] = await fs.readdir(
      TranslationsController.translationsFolder
    );

    // Read dir
    for (let filename of files) {
      const file: String = TranslationsController.translationsFolder + filename;
      // Only JSON files
      const extension = filename.substring(filename.indexOf('.') + 1);

      if (extension == 'json') {
        const lang = filename.substring(0, filename.indexOf('.'));

        // Check if file is readable
        const fileStats: fs.Stats = await fs.stat(file);
        if (!(fileStats.mode | fs.S_IRWXO)) {
          throw 'File Not Readable';
        }

        const content: String | Buffer | fs.Dirent = await fs.readFile(
          file,
          'utf8'
        );
        // console.log(content);

        translations[lang] = JSON.parse(content);
        // await writeFile('Test', content);
      }
    }

    return res.status(202).json(translations);
  }

  /**
   * Send the assignments to the service for storage
   * @type POST
   */
  static async saveTranslations(req: any, res: any, next: any) {
    try {
      // File writing here

      return res.status(202).json({ generatedData: 'result' });
    } catch (err) {
      // This is an unexpected error, so pass it on
      return next(err);
    }
  }
}

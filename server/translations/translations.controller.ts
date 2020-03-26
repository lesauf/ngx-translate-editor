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
    let translations: any = {};

    const files: string[] = await fs.readdir(
      TranslationsController.translationsFolder
    );

    // Read dir
    for (let filename of files) {
      const file: string = TranslationsController.translationsFolder + filename;
      // Only JSON files
      const extension = filename.substring(filename.indexOf('.') + 1);

      if (extension == 'json') {
        const lang = filename.substring(0, filename.indexOf('.'));

        // Check if file is readable
        const fileStats = await fs.stat(file);
        if (!(fileStats.mode | fs.S_IRWXO)) {
          throw 'File Not Readable';
        }

        const content: string = await fs.readFile(file, 'utf8');
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
  static async saveTranslations(translations: any, res: any, next: any) {
    try {
      // File writing here
      const files: string[] = await fs.readdir(
        TranslationsController.translationsFolder
      );

      // Read dir
      for (let filename of files) {
        const file: string =
          TranslationsController.translationsFolder + filename;
        // Only JSON files
        const extension = filename.substring(filename.indexOf('.') + 1);

        if (extension == 'json') {
          const lang = filename.substring(0, filename.indexOf('.'));

          // Check if file is readable
          const fileStats = await fs.stat(file);
          if (!(fileStats.mode | fs.S_IRWXO)) {
            throw 'File Not Readable or Writable by Others';
          }

          const content: string = await fs.writeFile(
            file,
            JSON.stringify(translations[lang], null, 2),
            'utf8'
          );
        }
      }

      return res
        .status(202)
        .json({ message: 'Translations saved successfully' });
    } catch (err) {
      // This is an unexpected error, so pass it on
      return next(err);
    }
  }
}

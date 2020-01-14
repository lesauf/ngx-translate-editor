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
   * Translation files discovered in the folder
   *
   * @name translationFiles
   */
  translationFiles: string[];

  constructor() {}

  /**
   * Get all the json files in the folder
   * @todo SEND THIS TO EXPRESS
   */
  ngOnInit() {
    this.translationFiles = ['en.json', 'fr.json'];

    // // joining path of directory
    // const directoryPath = path.join(this.translationsFolder);
    // console.log('dir = ', directoryPath);
    // // passing directoryPath and callback function
    // fs.readdir(this.translationsFolder, (err, files) => {
    //   // handling error
    //   if (err) {
    //     return console.log('Unable to scan directory: ' + err);
    //   }
    //   // getting all the json files
    //   files.forEach(file => {
    //     if (path.extname(file) === 'json') {
    //       this.translationFiles.push(file);
    //     }
    //   });
    // });
  }
}

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
  translationFiles: File[];

  constructor() {}

  ngOnInit() {
    // Get all the json files in the folder
  }
}

import { Component } from '@angular/core';
import { DataService } from './core/data.service';
import { dsvFormat, tsvFormatRow, tsvFormatRows, tsvParse, tsvParseRows } from 'd3-dsv';
import { CubeResults, TableData } from './core/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teal-green-holidays';

  constructor(
    public dataService: DataService
  ) {

  }

  ngOnInit() {
    this.dataService.getCubeResults().subscribe((res: TableData) => {
      console.log(res);
    })
  }
}

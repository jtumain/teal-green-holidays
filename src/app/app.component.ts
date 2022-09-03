import { Component } from '@angular/core';
import { TableData } from './core/data.model';
import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'teal-green-holidays';
  tableData: TableData = {
    colDefs: [],
    rowDefs: [],
    cellData: [],
    colHeaderCodes: [],
    dataSource: []
  };

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCubeResults().subscribe((tableData: TableData) => {
      this.tableData = tableData;
    });
  }
}

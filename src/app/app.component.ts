import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from './core/data.model';
import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSort) sort!: MatSort;

  title = 'teal-green-holidays';
  tableData: TableData = {
    colDefs: [],
    rowDefs: [],
    cellData: [],
    colHeaderCodes: [],
    dataSource: [],
    displayColumns: []
  };

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCubeResults(true).subscribe((tableData: TableData) => {
      this.tableData = tableData;
      this.dataSource = tableData.dataSource as any;
      this.displayedColumns = tableData.displayColumns;

      this.dataSource.sort = this.sort;
    });
  }


  ngAfterViewInit() {}
}

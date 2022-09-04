import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
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
    colHeaderCodes: [],
    dataSource: [],
    displayColumns: [],
    displayDefs: []
  };

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCubeResults(true).subscribe((tableData: TableData) => {
      this.tableData = tableData;
    });
  }

  /**
   * Sort column data.
   * @param sort 
   * @returns 
   */
  sortData(sort: Sort) {
    const data = this.tableData.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData.dataSource = data;
      return;
    }

    this.tableData.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const prop = sort.active;
      return this.compare(a[prop], b[prop], isAsc) || 0;
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngAfterViewInit() {}
}

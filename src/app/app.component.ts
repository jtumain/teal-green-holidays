import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './core/auth/auth.service';
import { TableData } from './core/data.model';
import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSort) sort!: MatSort;

  tableData: TableData = {
    dataSource: [],
    displayColumns: [],
    displayDefs: []
  };

  selectedColumnsFormGroup!: FormGroup;

  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public authService: AuthService) {}

  ngOnInit() {
    this.dataService.getCubeResults(true).subscribe((tableData: TableData) => {
      this.tableData = tableData;

      this.selectedColumnsFormGroup = this.formBuilder.group({
        selectedColumns: new FormArray([])
      });
      this._addCheckboxes();
    });

    this.authService.login('jalexander', 'JustinCloudDemo1!')
      .subscribe(response => {
        console.log(response);
      });
  }

  get selectedColumnsFormArray() {
    return this.selectedColumnsFormGroup.controls['selectedColumns'] as FormArray;
  }

  private _addCheckboxes() {
    // remove first column from being filterable
    let columns: string[] = [...this.tableData.displayDefs];
    columns.forEach(() => this.selectedColumnsFormArray.push(new FormControl(true)));
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

}

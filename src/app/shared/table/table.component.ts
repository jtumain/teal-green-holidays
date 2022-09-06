import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { TableData } from '../../core/data.model';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  tableData: TableData = {
    dataSource: [],
    displayColumns: [],
    displayDefs: [],
  };

  selectedColumnsFormGroup!: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.dataService.getCubeResults(true).subscribe((tableData: TableData) => {
      this.tableData = tableData;

      this.selectedColumnsFormGroup = this.formBuilder.group({
        selectedColumns: new FormArray([]),
      });
      this._addCheckboxes();
    });
  }

  get selectedColumnsFormArray() {
    return this.selectedColumnsFormGroup.controls[
      'selectedColumns'
    ] as FormArray;
  }

  private _addCheckboxes() {
    // remove first column from being filterable
    let columns: string[] = [...this.tableData.displayDefs];
    columns.forEach(() =>
      this.selectedColumnsFormArray.push(new FormControl(true))
    );
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

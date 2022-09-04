import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tsvParse } from 'd3-dsv';
import { map, Observable } from 'rxjs';
import { CubeResults, TableData } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public http: HttpClient) {}

  /**
   * Get cube results in a tabular format.
   * @param transpose true, if the table data should be flipped
   * @returns 
   */
  public getCubeResults(transpose: boolean = false): Observable<TableData> {
    return this.http.get('../assets/data/cube-results.json').pipe(
      map((response) => {
        return this._convertCubeResultsToTableData(response as CubeResults, transpose);
      })
    );
  }

  /**
   * 
   * @param results 
   * @param transpose true, if the table data should be flipped 
   * @returns 
   */
  private _convertCubeResultsToTableData(
    results: CubeResults,
    transpose: boolean = false
  ) {

    const rowDefs = tsvParse(
      results.dimensionResults[1].headerDescriptions
    ).columns;

    const colHeaderCodes = tsvParse(
      results.dimensionResults[0].headerCodes
    ).columns;

    // create an extra column for the table's left definitions
    colHeaderCodes.unshift('id');

    let colDefs = tsvParse(
      results.dimensionResults[0].headerDescriptions
    ).columns;
    colDefs.unshift(' ');

    const cellData = results.measureResults[0].rows.map(
      (row) => tsvParse(row).columns
    );

    // construct data in format for mat-table dataSource
    let dataSource: any = [];
    for (let i = 0; i < cellData.length; i++) {
      // get the row data and add the row name
      const rowName = rowDefs[i];
      let row = [rowName, ...cellData[i]];
      let rowData: any = {};

      for (let j = 0; j < row.length; j++) {
        const headerCode = colHeaderCodes[j];
        const value = row[j];
        rowData[headerCode] = Number.parseInt(value) || value;
      }

      dataSource.push(rowData);
    }

    let tableData: TableData = {
      colDefs: colDefs,
      rowDefs: rowDefs,
      cellData: cellData,
      colHeaderCodes: colHeaderCodes,
      dataSource: dataSource,
      displayColumns: colHeaderCodes
    };

    if (transpose) {
      this.transpose(tableData)
    }

    console.log(tableData);
    return tableData;
  }

  /**
   * Flip the table structure.
   * @param tableData 
   */
  transpose(tableData: TableData) {
    let inputData = [...tableData.dataSource];
    let inputColumns = tableData.colHeaderCodes;
    let dataSource = [];

    // id is the key used for reference
    let displayColumns = inputData.map((x) => {
      return x['id'].toString();
    });
    dataSource = inputColumns.map((x) => this.formatInputRow(x, inputData));

    for (let i = 0; i < dataSource.length; i++) {
      const colName = tableData.colDefs[i];
      dataSource[i][' '] = colName;
    }
    // add preceeding column
    displayColumns.unshift(' ');
    // remove the column definitions to stop them being shown twice
    dataSource = dataSource.splice(1);
    // update table data
    tableData.dataSource = dataSource;
    tableData.displayColumns = displayColumns;
  }

  /**
   * Map data from each row to the new structure.
   * @param row 
   * @param inputData 
   * @returns 
   */
  formatInputRow(row: any, inputData: any[]) {
    const output: any = {};

    output[0] = row;
    for (let i = 0; i < inputData.length; ++i) {
      output[inputData[i]['id']] = inputData[i][row];
    }
    return output;
  }
}

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

  public getCubeResults(): Observable<TableData> {
    return this.http.get('../assets/data/cube-results.json').pipe(
      map((response) => {
        return this._convertCubeResultsToTableData(response as CubeResults);
      })
    );
  }

  private _convertCubeResultsToTableData(results: CubeResults) {
    const rowHeaderCodes = tsvParse(
      results.dimensionResults[1].headerCodes
    ).columns;
    const rowDefs = tsvParse(
      results.dimensionResults[1].headerDescriptions
    ).columns;

    const colHeaderCodes = tsvParse(
      results.dimensionResults[0].headerCodes
    ).columns;
    colHeaderCodes.unshift('key');

    let colDefs = tsvParse(
      results.dimensionResults[0].headerDescriptions
    ).columns;
    colDefs.unshift('Year');

    const cellData = results.measureResults[0].rows.map(
      (row) => tsvParse(row).columns
    );

    let dataSource = [];
    for (let i = 0; i < cellData.length; i++) {
      let row =  cellData[i];
      let rowData: any = {};

      for (let j = 0; j < row.length; j++) {
        const headerCode = colHeaderCodes[j];
        const value =  row[j];
        rowData[headerCode] = value;
      }

      const rowName = rowDefs[i];
      rowData['key'] = rowName;

      console.log(rowData);
      dataSource.push(rowData);
    }

    const tableData: TableData = {
      colDefs: colDefs,
      rowDefs: rowDefs,
      cellData: cellData,
      colHeaderCodes: colHeaderCodes,
      dataSource: dataSource
    };
    
    console.log(tableData);
    return tableData;
  }
}

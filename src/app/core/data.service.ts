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
    const colDefs = tsvParse(
      results.dimensionResults[1].headerDescriptions
    ).columns;

    const rowDefs = tsvParse(
      results.dimensionResults[0].headerDescriptions
    ).columns;

    const cellData = results.measureResults[0].rows.map(
      (row) => tsvParse(row).columns
    );

    const tableData: TableData = {
      colDefs: colDefs,
      rowDefs: rowDefs,
      cellData: cellData,
    };
    
    console.log(tableData);
    return tableData;
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { TableData } from '../core/data.model';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-bookings-api',
  templateUrl: './bookings-api.component.html',
  styleUrls: ['./bookings-api.component.scss'],
})
export class BookingsApiComponent implements OnInit {
  tableData!: TableData;
  loading = true;

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.http
      .get('../assets/data/cube-request.json')
      .pipe(
        switchMap((tableData) => {
          return this.dataService.getApiCubeResults(tableData, true);
        })
      )
      .subscribe((tableData: TableData) => {
        this.tableData = tableData;
        this.loading = false;
      });
  }
}

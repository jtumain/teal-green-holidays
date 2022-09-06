import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { TableData } from '../core/data.model';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

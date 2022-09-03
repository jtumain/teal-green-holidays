import { Component } from '@angular/core';
import { DataService } from './core/data.service';
import { dsvFormat, tsvParse } from 'd3-dsv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teal-green-holidays';

  constructor(
    public dataService: DataService
  ) {

  }

  ngOnInit() {
    this.dataService.getCubeResults().subscribe((res: any) => {
      console.log(res);;

      const psv = tsvParse(res.dimensionResults[0].headerDescriptions);
      console.log(psv);
    })
  }
}

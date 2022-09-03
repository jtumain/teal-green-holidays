import { Component } from '@angular/core';
import { DataService } from './core/data.service';

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
    this.dataService.getCubeResults().subscribe(res => {
      console.log(res);
    })
  }
}

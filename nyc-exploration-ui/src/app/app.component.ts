import { Component } from '@angular/core';
import { DatabaseService } from './app.service'
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'nyc-exploration';
  data = 'sample text';
  _DatabaseService;

  constructor(private http: HttpClient) {
    this._DatabaseService = new DatabaseService(http)

    console.log('Constructed')
  }

  ngOnInit() {
    this.getData()

    console.log('init')
  }

  getData() {

    console.log('inside getData')
    this._DatabaseService.getEvents().subscribe(
      data => { this.data = JSON.stringify(data) },
      err => { console.log(err) },
      () => { console.log('done loading data') }
    )
  }
}

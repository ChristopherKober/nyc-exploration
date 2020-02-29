import { Component, ViewChild } from '@angular/core';
import { DatabaseService } from './app.service'
import { HttpClient, HttpHandler } from '@angular/common/http';
import { InputFormComponent } from './input-form/input-form.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'nyc-exploration';
  data = 'sample text';
  _DatabaseService;
  _dialog;

  fileNameDialogRef: MatDialogRef<InputFormComponent>;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this._DatabaseService = new DatabaseService(http)
    this._dialog = dialog
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this._DatabaseService.getEvents().subscribe(
      data => { this.data = JSON.stringify(data) },
      err => { console.log(err) },
      () => { }
    )
  }

  openInputDialog() {
    this.fileNameDialogRef = this._dialog.open(InputFormComponent, {
      height: '520px',
      width: '500px',
    });
  }
}

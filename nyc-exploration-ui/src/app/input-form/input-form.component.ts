import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DatabaseService } from '../database.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  @ViewChild(MatDatepicker, { static: false }) datepicker: MatDatepicker<Date>;

  name: String;
  type: String;
  neighborhood: String;

  _formBuilder;
  _newEventGroup;
  _dialog;
  _DatabaseService;

  neighborhoodList = [];

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient) {
    this._DatabaseService = new DatabaseService(http)

    this._formBuilder = formBuilder;
    this._newEventGroup = this._formBuilder.group({
      eventName: '',
      eventType: '',
      eventNeighborhood: '',
      eventDate: '',
      eventComments: '',
      eventRating: '',
      password: ''
    })
    this._dialog = dialog
  }

  ngOnInit() {

    this.getData();

  }

  submit() {

    var date = new Date(this._newEventGroup.get("eventDate").value)

    var dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    this._DatabaseService.postNewEvent(
      this._newEventGroup.get("eventType").value,
      this._newEventGroup.get("eventName").value,
      this._newEventGroup.get("eventNeighborhood").value,
      dateString,
      this._newEventGroup.get("eventRating").value,
      this._newEventGroup.get("eventComments").value,
      this._newEventGroup.get("password").value
    ).subscribe(
      x => null,
      e => null,
      () => null);

    this._dialog.closeAll();
  }

  getData() {
    this._DatabaseService.getNeighborhoods().subscribe(
      data => {
        console.log(data);
        this.neighborhoodList = data;
      }
    )
  }

}

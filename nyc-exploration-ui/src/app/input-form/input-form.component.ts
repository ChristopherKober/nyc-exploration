import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

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

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
    this._formBuilder = formBuilder;
    this._newEventGroup = this._formBuilder.group({
      eventName: '',
      eventType: '',
      eventNeighborhood: '',
      eventDate: '',
      eventComments: ''
    })
    this._dialog = dialog
  }

  ngOnInit() {
  }

  submit() {
    console.log("Name: " + this._newEventGroup.get("eventName").value +
      ", Type: " + this._newEventGroup.get("eventType").value +
      ", Neighborhood: " + this._newEventGroup.get("eventNeighborhood").value +
      ", Date: " + this._newEventGroup.get("eventDate").value +
      ", Comments: " + this._newEventGroup.get("eventComments").value);

    this._dialog.closeAll();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from '../../../models/EventType';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';

@Component({
  selector: 'app-event-type-dialog',
  templateUrl: './event-type-dialog.component.html',
  styleUrls: ['./event-type-dialog.component.scss']
})
export class EventTypeDialogComponent implements OnInit {

  eventTypeForm: FormGroup;
  eventID: string;
  eventTypeName: string;

  constructor(private _eventTypeServices: EventTypeService, private _form: FormBuilder, private _router: Router, private _route: ActivatedRoute) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.eventTypeForm = this._form.group({
      ID: new FormControl,
      Name: new FormControl
    });
  }
  onSubmit(){
    this._eventTypeServices.createEventType(this.eventTypeForm.value)
    .subscribe(data => {this._router.navigate(['../admin']);
  });
  }
}

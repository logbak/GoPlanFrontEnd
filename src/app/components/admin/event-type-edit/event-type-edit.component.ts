import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EventTypeService } from 'src/app/services/event-type.service';

@Component({
  selector: 'app-event-type-edit',
  templateUrl: './event-type-edit.component.html',
  styleUrls: ['./event-type-edit.component.scss']
})
export class EventTypeEditComponent implements OnInit {

  EventTypeForm: FormGroup;
  eventID: number;
  eventTypeName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _eventTypeServices: EventTypeService, private _form: FormBuilder, private _router: Router, private _route: ActivatedRoute) { 
    this.createForm();
  }

  ngOnInit() {
  }
  createForm(){
    this.EventTypeForm = this._form.group({
      ID: new FormControl,
      Name: new FormControl
    });
  }
  
  onSubmit(){
    // this._eventTypeServices.updateEventType()
    // .subscribe(data => {this._router.navigate(['../admin']);
  // });
  }
}

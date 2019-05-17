import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from 'src/app/models/EventType';

@Component({
  selector: 'app-event-type-edit',
  templateUrl: './event-type-edit.component.html',
  styleUrls: ['./event-type-edit.component.scss']
})
export class EventTypeEditComponent implements OnInit {

  eventType: EventType;
  EventTypeForm: FormGroup;
  eventID: number;
  eventTypeName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _eventTypeServices: EventTypeService, private _form: FormBuilder, private _router: Router, private _ar: ActivatedRoute) {
      this._eventTypeServices.getEventTypeByID(data.id).subscribe((singleEventType: EventType) => {
        this.eventType = singleEventType;
        console.log(this.eventType)
        this.createForm();
      });
    
  }

  ngOnInit() {
  }
  createForm() {
    this.EventTypeForm = this._form.group({
      ID: new FormControl (this.eventType.ID),
      Name: new FormControl(this.eventType.Name)
    });
  }

  onSubmit(form) {
    const updateEventType: EventType = {
      ID: form.value.ID,
      Name: form.value.Name
    };
    this._eventTypeServices.updateEventType(updateEventType)
    .subscribe(data => {this._router.navigate(['../admin']);
    });
  }
}

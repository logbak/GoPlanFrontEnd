import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { VacaEventService } from 'src/app/services/vaca-event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __values } from 'tslib';
import { EventType } from 'src/app/models/EventType';
import { EventTypeService } from 'src/app/services/event-type.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})

export class NewEventComponent implements OnInit {

  vacaEventForm: FormGroup;
  vacaID: string;
  vacaIdNumber: number;
  options: EventType[]

  constructor(private _vacaEventService: VacaEventService, private _eventTypeServices: EventTypeService, private _form: FormBuilder, private _router: Router, private _route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.vacaID = this._route.snapshot.paramMap.get('id');
    this.vacaIdNumber = parseInt(this.vacaID, 10);
    this._eventTypeServices.getEventTypeList().subscribe((eventtype: EventType[]) => {
      this.options = eventtype;
    });
  }

  createForm() {
    this.vacaEventForm = this._form.group({
      VacationID: new FormControl,
      EventTypeID: new FormControl,
      Name: new FormControl,
      Description: new FormControl,
      LocationName: new FormControl,
      GooglePlaceID: new FormControl,
      ImageSource: new FormControl,
      StartDate: new FormControl,
      EndDate: new FormControl,
      Cost: new FormControl
    });

    this.vacaEventForm.patchValue({ Cost: 0 });
  }

  onSubmit() {
    this.vacaEventForm.patchValue({ VacationID: this.vacaIdNumber });
    this._vacaEventService.createVacaEvent(this.vacaEventForm.value)
      .subscribe(data => {
        this._router.navigate([`/vacation/${this.vacaID}`]);
      });
  }

}
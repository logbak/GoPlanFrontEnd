import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacaEventService } from 'src/app/services/vaca-event.service';
import { VacaEvent } from 'src/app/models/VacaEvent';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from 'src/app/models/EventType';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  vacaEvent: VacaEvent;
  editEventForm: FormGroup;
  eventID: string;
  vacaID: string;
  minDate = new Date();
  options: EventType[];
  eID: number;
  currentEventType: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _vacaEventService: VacaEventService,
    private _eventTypeServices: EventTypeService,
    private _form: FormBuilder) {

    this._vacaEventService.getVacaEvent(this._activatedRoute.snapshot.paramMap.get('id2'))
      .subscribe((singleEvent: VacaEvent) => {
        this.vacaEvent = singleEvent;
        if (this.vacaEvent.User == localStorage.getItem('username') || localStorage.getItem('user_role') == "Admin") {
          this.createForm();
          this.eID = this.vacaEvent.ID;
        }
        else {
          this._router.navigate(['/vacation/my-vacations']);
        }
      });

  }

  ngOnInit() {
    console.log(this.eID);
    this.vacaID = this._activatedRoute.snapshot.paramMap.get('id');
    this.getOptions();
    console.log(this.options);
    this.getCurrentEventTypeName();
    console.log(this.currentEventType);
  }

  createForm() {
    this.editEventForm = this._form.group({
      EventType: new FormControl(),
      Name: new FormControl(this.vacaEvent.Name),
      Description: new FormControl(this.vacaEvent.Description),
      LocationName: new FormControl(this.vacaEvent.LocationName),
      GooglePlaceId: new FormControl(this.vacaEvent.GooglePlaceId),
      ImageSource: new FormControl(this.vacaEvent.Imagesource),
      StartDate: new FormControl(this.vacaEvent.StartDate),
      EndDate: new FormControl(this.vacaEvent.EndDate),
      Cost: new FormControl(this.vacaEvent.Cost)
    });
  }

  getOptions() {
    this._eventTypeServices.getEventTypeList().subscribe((eventtype: EventType[]) => this.options = eventtype);
  }

  getCurrentEventTypeName() {
    this.options.forEach(function (e) {
      if (e.ID == this.eID) {
        this.currentEventType = e.Name;
      }
    });
  }

  onSubmit(form) {
    const updateEvent: VacaEvent = {
      EventTypeId: form.value.EventTypeID,
      Name: form.value.Name,
      Description: form.value.Description,
      LocationName: form.value.LocationName,
      GooglePlaceId: form.value.GooglePlaceId,
      Imagesource: form.value.ImageSource,
      StartDate: form.value.StartDate,
      EndDate: form.value.EndDate,
      Cost: form.value.Cost
    };
    this._vacaEventService.updateVacaEvent(updateEvent)
      .subscribe(data => {
        this._router.navigate([`/vacation/${this.vacaID}`]);
      }
      );
  }

}

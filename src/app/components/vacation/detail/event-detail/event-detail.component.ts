import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacaEventService } from 'src/app/services/vaca-event.service';
import { VacaEvent } from 'src/app/models/VacaEvent';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  vacaEvent: VacaEvent;
  editEventForm: FormGroup;
  vacaID: string;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _vacaEventService: VacaEventService, private _form: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    this._activatedRoute.paramMap
      .subscribe(routeData => 
      {
        this._vacaEventService.getVacaEvent(routeData.get('id'))
          .subscribe((singleVacaEvent: VacaEvent) => 
          {
            this.vacaEvent = singleVacaEvent;
          }
        );
      }
    );
    this.vacaID = this._activatedRoute.snapshot.paramMap.get('vacation');
    console.log(this.vacaID);
  }

  createForm() {
    this.editEventForm = this._form.group({
      EventTypeId: new FormControl(this.vacaEvent.EventTypeId),
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
      .subscribe(data => 
        {
          this._router.navigate([`/vacation/${this.vacaID}`]);
        }
      );
  }

}

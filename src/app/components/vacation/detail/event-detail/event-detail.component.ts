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
  eventID: string;
  vacaID: string;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _vacaEventService: VacaEventService, private _form: FormBuilder) { 
    
    this._vacaEventService.getVacaEvent(this._activatedRoute.snapshot.paramMap.get('id2'))
      .subscribe((singleEvent: VacaEvent) => 
      {
        this.vacaEvent = singleEvent;
        this.createForm();
      });

    }

  ngOnInit() {
    this.vacaID = this._activatedRoute.snapshot.paramMap.get('id');
  }

  createForm() {
    this.editEventForm = this._form.group({
      EventTypeId: new FormControl(),
      Name: new FormControl(),
      Description: new FormControl(),
      LocationName: new FormControl(),
      GooglePlaceId: new FormControl(),
      ImageSource: new FormControl(),
      StartDate: new FormControl(),
      EndDate: new FormControl(),
      Cost: new FormControl()
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

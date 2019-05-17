import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacaEventService } from 'src/app/services/vaca-event.service';
import { VacaEvent } from 'src/app/models/VacaEvent';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from 'src/app/models/EventType';
import { DeleteConfirmComponent } from 'src/app/components/delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  vacaEvent: VacaEvent;
  editEventForm: FormGroup;
  eventID: string;
  vacaID: string | number;
  minDate = new Date();
  options: EventType[]
  currentEventType: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _vacaEventService: VacaEventService,
    private _eventTypeServices: EventTypeService,
    private _form: FormBuilder,
    public dialog: MatDialog) {

    this._vacaEventService.getVacaEvent(this._activatedRoute.snapshot.paramMap.get('id2'))
      .subscribe((singleEvent: VacaEvent) => {
        this.vacaEvent = singleEvent;
        if (this.vacaEvent.User == localStorage.getItem('username') || localStorage.getItem('user_role') == "Admin") {
          this.createForm();
        }
        else {
          this._router.navigate(['/vacation/my-vacations']);
        }
      });

  }

  ngOnInit() {
    this.vacaID = this._activatedRoute.snapshot.paramMap.get('id');
    this._eventTypeServices.getEventTypeList().subscribe((eventtype: EventType[]) => {
      this.options = eventtype;
      this.options.forEach((e) => {
        if (e.ID == this.vacaEvent.EventTypeID) {
          this.currentEventType = e.Name;
        }
      });
    });
  }

  createForm() {
    this.editEventForm = this._form.group({
      StartDate: new FormControl(this.vacaEvent.StartDate),
      EndDate: new FormControl(this.vacaEvent.EndDate),
      EventType: new FormControl(this.vacaEvent.EventTypeID),
      Name: new FormControl(this.vacaEvent.Name),
      Description: new FormControl(this.vacaEvent.Description),
      LocationName: new FormControl(this.vacaEvent.LocationName),
      GooglePlaceId: new FormControl(this.vacaEvent.GooglePlaceId),
      ImageSource: new FormControl(this.vacaEvent.Imagesource),
      Cost: new FormControl(this.vacaEvent.Cost)
    });
  }

  onSubmit(form) {
    console.log(form.value);
    const updateEvent: VacaEvent = {
      ID: this.vacaEvent.ID,
      VacationID: this.vacaEvent.VacationID,
      StartDate: form.value.StartDate,
      EndDate: form.value.EndDate,
      EventTypeID: form.value.EventType,
      Name: form.value.Name,
      Description: form.value.Description,
      LocationName: form.value.LocationName,
      GooglePlaceId: form.value.GooglePlaceId,
      Imagesource: form.value.ImageSource,
      Cost: form.value.Cost
    };
    this._vacaEventService.updateVacaEvent(updateEvent)
      .subscribe(data => {
        this._router.navigate([`/vacation/${this.vacaID}`]);
      }
      );
  }

  openDeleteDialog(item: VacaEvent) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, {data: {type: "vacaEvent", id: item.ID, name: item.Name, from: "", vacaID: item.VacationID}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

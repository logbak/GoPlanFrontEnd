import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { EventTypeService } from 'src/app/services/event-type.service';
import { VacationService } from 'src/app/services/vacation.service';
import { VacaEventService } from 'src/app/services/vaca-event.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _eventTypeServices: EventTypeService,
    private _vacationServices: VacationService,
    private _vacaEventServices: VacaEventService,
    private _router: Router) { }

  onDelete(id, type: string, from: string, vacaID) {
    switch(type) {
      case "eventType":{
        this._eventTypeServices.deleteEventType(id).subscribe(() => {
          this._router.navigate(['/admin'])
          window.location.reload();
        });
        break;
      }
      case "vacation":{
        this._vacationServices.deleteVacation(id).subscribe(() => {
          if (from == "admin"){
            this._router.navigate(['/admin'])
            window.location.reload();
          } else {
            this._router.navigate(['/vacation/my-vacations']);
          }    
        });
        break;
      }
      case "vacaEvent":{
        this._vacaEventServices.deleteVacaEvent(id).subscribe(() => {
          if (from == "admin"){
            this._router.navigate(['/admin'])
            window.location.reload();
          } 
          else if (from == "vacation"){
            window.location.reload();
          }
          else {
            this._router.navigate([`/vacation/${vacaID}`]);
          }  
        });
        break;
      }
    }
  }


  ngOnInit() {
  }

}

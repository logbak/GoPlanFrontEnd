import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from '../../../models/EventType';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {
  eventType: EventType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _eventTypeServices: EventTypeService, private _ar: ActivatedRoute, private _router: Router) {
    this._ar.paramMap.subscribe(p => {
      this._eventTypeServices.getEventTypeByID(p.get('id')).subscribe((singleEventType: EventType) => {
        this.eventType = singleEventType;
      });
    });
  }

  onDelete(id) {
    this._eventTypeServices.deleteEventType(id).subscribe(() => {
      this._router.navigate(['/admin'])
    });
  }


  ngOnInit() {
  }

}

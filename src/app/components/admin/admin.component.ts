import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/services/vacation.service';
import { Vacation } from '../../models/Vacation';

import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from '../../models/EventType';

import { VacaEventService} from 'src/app/services/vaca-event.service';
import { VacaEvent } from '../../models/VacaEvent';

import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _eventTypeServices: EventTypeService, private _VacaEventServices: VacaEventService, private _vacationServices: VacationService) { }

  ngOnInit() {
    
    this._eventTypeServices.getEventTypeList().subscribe((eventtype: EventType[]) =>
    { this.dataSource =  new MatTableDataSource<EventType>(eventtype)
   });

    this._vacationServices.getVacations().subscribe((vacation: Vacation[]) =>
     {this.dataSource1 = new MatTableDataSource<Vacation>(vacation)
    });

    this._VacaEventServices.getVacaEvents().subscribe((vacaEvent: VacaEvent[]) =>
    { this.dataSource2 =  new MatTableDataSource<VacaEvent>(vacaEvent)
   });

  }
  columnNames = ['EventTypeID', 'EventTypeName', 'Update', 'Delete']
  columnNames1 = [ 'User', 'VacationName', 'Update']
  columnNames2 = ['EventID', 'VacationId', 'VacaEventName', 'Update'];

  dataSource: MatTableDataSource<EventType>; 
  dataSource1: MatTableDataSource<Vacation>;
  dataSource2: MatTableDataSource<VacaEvent>;
}

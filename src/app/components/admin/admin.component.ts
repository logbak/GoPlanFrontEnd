import { Component, OnInit } from '@angular/core';
import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from '../../models/EventType';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _eventTypeServices: EventTypeService) { }

  ngOnInit() {
    this._eventTypeServices.getEventTypeList().subscribe((eventtype: EventType[]) => { this.dataSource =  new MatTableDataSource<EventType>(eventtype)
    });
  }
  columnNames = [ 'EventTypeID', 'EventTypeName']
  dataSource: MatTableDataSource<EventType>;
}

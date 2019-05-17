import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VacationService } from 'src/app/services/vacation.service';
import { Vacation } from '../../models/Vacation';

import { EventTypeService } from 'src/app/services/event-type.service';
import { EventType } from '../../models/EventType';

import { VacaEventService } from 'src/app/services/vaca-event.service';
import { VacaEvent } from '../../models/VacaEvent';

import { MatTableDataSource, MatDialog } from '@angular/material';
import { EventTypeDialogComponent } from './event-type-dialog/event-type-dialog.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { EventTypeEditComponent } from './event-type-edit/event-type-edit.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _eventTypeServices: EventTypeService, private _VacaEventServices: VacaEventService,
    private _vacationServices: VacationService, public dialog: MatDialog, private _ar: ActivatedRoute, private _router: Router) {
  }

  openDialog() {
    let dialogRef = this.dialog.open(EventTypeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getEventList();
    });
  }

  openDialog1(item: EventType) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, {data: {type: "eventType", id: item.ID, name: item.Name, from: "admin", vacaID: ""}});

    dialogRef.afterClosed().subscribe(result => {
      this.getEventList();
    });
  }
  openDialog2(item: EventType) {
    let dialogRef = this.dialog.open(EventTypeEditComponent, { data: { id: item.ID, name: item.Name } });

    dialogRef.afterClosed().subscribe( resutlts => {
      this.getEventList()
    });
    // this.getEventList();
  }

  getEventList() {
    this._eventTypeServices.getEventTypeList().subscribe((eventtype: EventType[]) => {
      this.dataSource = new MatTableDataSource<EventType>(eventtype)
    });
  }
  getVacationList() {
    this._vacationServices.getVacations().subscribe((vacation: Vacation[]) => {
      this.dataSource1 = new MatTableDataSource<Vacation>(vacation)
    });
  }
  getVacaEventList() {
    this._VacaEventServices.getVacaEvents().subscribe((vacaEvent: VacaEvent[]) => {
      this.dataSource2 = new MatTableDataSource<VacaEvent>(vacaEvent)
    });
  }

  ngOnInit() {
    this.getEventList();
    this.getVacationList();
    this.getVacaEventList();
  }
  columnNames = ['EventTypeID', 'EventTypeName', 'Update']
  columnNames1 = ['User', 'VacationName', 'Update']
  columnNames2 = ['EventID', 'VacationId', 'VacaEventName', 'Update'];

  dataSource: MatTableDataSource<EventType>;
  dataSource1: MatTableDataSource<Vacation>;
  dataSource2: MatTableDataSource<VacaEvent>;
}

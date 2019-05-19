import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from 'src/app/services/vacation.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VacaEdit } from 'src/app/models/VacaEdit';

import { VacaEventService } from 'src/app/services/vaca-event.service';
import { VacaEvent } from '../../../models/VacaEvent';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { FormArray } from '@angular/forms';
import { DeleteConfirmComponent } from '../../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  vacation: VacaEdit;
  editVacationForm: FormGroup;
  vacaEvent: VacaEvent;
  dataSource: MatTableDataSource<VacaEvent>;
  minDate = new Date();

  columnNames = ['VacaEventName', 'StartDate', 'EndDate', 'ID', 'Details'];

  constructor(private _form: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _vacationService: VacationService,
    private _router: Router,
    private _VacaEventServices: VacaEventService,
    public dialog: MatDialog) {

    this._activatedRoute.paramMap.subscribe(p => {
      this._vacationService.getVacationGetByID(p.get('id')).subscribe((singleVacation: VacaEdit) => {
        this.vacation = singleVacation;
        console.log(this.vacation);
        this.createForm();
      });
    });
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(p => {
      this._VacaEventServices.getVacaEventsByVacation(p.get('id')).subscribe((vacaEvent: VacaEvent[]) => {
      this.dataSource = new MatTableDataSource<VacaEvent>(vacaEvent)
      });
    });
  }

  createForm() {
    this.editVacationForm = this._form.group({
      Name: [`${this.vacation.Name}`],
      Description: [`${this.vacation.Description}`],
      ImageSource: [`${this.vacation.ImageSource}`],
      StartDate: [`${this.vacation.StartDate}`],
      EndDate: [`${this.vacation.EndDate}`],
      Attendees: this._form.array([
        this._form.control('')
      ])
    });
  }

  get Attendees() {
    return this.editVacationForm.get('Attendees') as FormArray;
  }

  addAttendees() {
    this.Attendees.push(this._form.control(''));
    console.log(this.Attendees.value);
  }

  removeAttendee(i) {
    this.Attendees.removeAt(i);
  }


  onSubmit(form) {
    console.log(form.value);
    const updateVacation: VacaEdit = {
      ID: this.vacation.ID,
      Name: form.value.Name,
      Description: form.value.Description,
      ImageSource: form.value.ImageSource,
      StartDate: form.value.StartDate,
      EndDate: form.value.EndDate,
      Attendees: form.value.Attendees
    };
    this._vacationService.updateVacation(updateVacation).subscribe(d => {
      this._router.navigate(['/vacation/my-vacations']);
    });
  }

  openDeleteDialogVacaEvent(item: VacaEvent) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, {data: {type: "vacaEvent", id: item.ID, name: item.Name, from: "vacation", vacaID: item.VacationID}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialogVacation(item: VacaEdit) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, {data: {type: "vacation", id: item.ID, name: item.Name, from: "", vacaID: ""}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


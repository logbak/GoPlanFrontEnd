import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from 'src/app/services/vacation.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VacaEdit } from 'src/app/models/VacaEdit';

import { VacaEventService } from 'src/app/services/vaca-event.service';
import { VacaEvent } from '../../../models/VacaEvent';
import { MatTableDataSource } from '@angular/material';

import { FormArray } from '@angular/forms';

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


  columnNames = ['VacaEventName', 'StartDate', 'EndDate', 'ID'];

  constructor(private _form: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _vacationService: VacationService,
    private _router: Router,
    private _VacaEventServices: VacaEventService) {

    this._activatedRoute.paramMap.subscribe(p => {
      this._vacationService.getVacationGetByID(p.get('id')).subscribe((singleVacation: VacaEdit) => {
        this.vacation = singleVacation;
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
}


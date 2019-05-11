import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from 'src/app/services/vacation.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { VacaEdit } from 'src/app/models/VacaEdit';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  vacation: VacaEdit;
  editVacationForm: FormGroup;

  constructor(private _form: FormBuilder,
              private _activatedRoute: ActivatedRoute, 
              private _vacationService: VacationService,
              private _router: Router) { 

                this._activatedRoute.paramMap.subscribe(p => {
                  this._vacationService.getVacationGetByID(p.get('id')).subscribe((singleVacation: VacaEdit) =>{
                    this.vacation = singleVacation;
                    this.createForm();
                  });
                });
              }

  ngOnInit() {
}

createForm() {
  this.editVacationForm = this._form.group({
    Name: new FormControl(),
    Description: new FormControl(),
    ImageSource: new FormControl(),
    StartDate: new FormControl(),
    EndDate: new FormControl(),
    Attendees: new FormControl()
  });

  // initialize second form for just EventList here?
}

onSubmit(form){
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
    this._router.navigate(['/my-vacations']);
  });
  }
}
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
  //   this._activatedRoute.paramMap.subscribe(routeData => {
  //     this._vacationService.getVacationGetByID(routeData.get('id')).subscribe((singleVacation: Vacation) => {
  //       this.vacation = singleVacation;
  //     });
  //   });
  // }
}

createForm() {
  this.editVacationForm = this._form.group({
    Name: new FormControl(this.vacation.Name),
    Description: new FormControl(this.vacation.Description),
    ImageSource: new FormControl(this.vacation.ImageSource),
    StartDate: new FormControl(this.vacation.StartDate),
    EndDate: new FormControl(this.vacation.EndDate),
    Attendees: new FormControl(this.vacation.Attendees)

    // initialize second form for just EventList here?
  });
}

onSubmit(form){
  console.log(this.vacation);
  const updateVacation: VacaEdit = {
    ID: this.vacation.ID,
    Name: form.value.Name,
    Description: form.value.Description,
    ImageSource: form.value.ImageSource,
    StartDate: form.value.StartDate,
    EndDate: form.value.EndDate
  };
  this._vacationService.updateVacation(updateVacation).subscribe(d => {
    this._router.navigate(['/my-vacations']);
  });
  }
}
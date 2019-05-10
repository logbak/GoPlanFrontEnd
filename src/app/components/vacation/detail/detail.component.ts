import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { Vacation } from 'src/app/models/Vacation';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from 'src/app/services/vacation.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  vacation: Vacation;
  editVacationForm: FormGroup;

  constructor(private _form: FormBuilder,
              private _activatedRoute: ActivatedRoute, 
              private _vacationService: VacationService,
              private _router: Router) { }

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
    EndDate: new FormControl(this.vacation.EndDate)
  });
}

onSubmit(form){
  const updateVacation: Vacation = {
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
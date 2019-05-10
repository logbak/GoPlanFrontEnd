import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/services/vacation.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

  vacationForm: FormGroup;
 

  constructor(private _vacationService: VacationService, private _form: FormBuilder, private _router: Router, private _route: ActivatedRoute) { 
    this.createForm();
  }

  ngOnInit() {
   
  }

  createForm() {
    this.vacationForm = this._form.group({
    
      Name: new FormControl,
      Description: new FormControl,
      LocationName: new FormControl,
      GooglePlaceID: new FormControl,
      ImageSource: new FormControl,
      StartDate: new FormControl,
      EndDate: new FormControl
    });

    
  }
  
  onSubmit() {
    
    this._vacationService.createVacation(this.vacationForm.value)
      .subscribe(data => { this._router.navigate([`/vacation/my-vacations/`]);
    });
  }

}
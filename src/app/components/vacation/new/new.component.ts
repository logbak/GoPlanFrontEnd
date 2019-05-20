import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/services/vacation.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

  vacationForm: FormGroup;
 

  constructor(private _vacationService: VacationService, private _form: FormBuilder, private _router: Router) { 
    this.createForm();
  }

  ngOnInit() {
   
  }

  createForm() {
    this.vacationForm = this._form.group({
      Name: [''],
      Description: [''],
      ImageSource: [''],
      StartDate: [''],
      EndDate: [''],
      Attendees: this._form.array([
        this._form.control('')
      ])
    });    
  }

  get Attendees() {
    return this.vacationForm.get('Attendees') as FormArray;
  }

  addAttendees() {
    this.Attendees.push(this._form.control(''));
  }

  removeAttendee(i) {
    this.Attendees.removeAt(i);
  }
  
  onSubmit() {
    
    this._vacationService.createVacation(this.vacationForm.value)
      .subscribe(data => { this._router.navigate([`/vacation/my-vacations/`]);
    });
  }

}
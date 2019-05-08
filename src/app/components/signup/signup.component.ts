import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private _registerForm: FormGroup;

  constructor(private _form: FormBuilder, private _authService: AuthService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this._registerForm = this._form.group({
      email: new FormControl,
      password: new FormControl,
      confirmPassword: new FormControl
    });
  }

  onSubmit() {
    this._authService
    .register(this._registerForm.value)
    .subscribe( () => this._authService.login(this._registerForm.value));
  }
}

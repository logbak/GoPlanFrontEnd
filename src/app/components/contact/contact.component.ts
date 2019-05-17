
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      message: ['', Validators.required]
     
    });
   }

   onSubmit() {
     this.submitted = true;

     if (this.contactForm.invalid) {
       return;
     }

     this.http
        .post('https://formspree.io/snmcfarland@gmail.com', {
          name: this.contactForm.value.name,
          contact: this.contactForm.value.contact,
          message: this.contactForm.value.message
        });
   }

  ngOnInit() {
  }

}

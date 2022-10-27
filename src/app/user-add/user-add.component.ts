import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiServices } from 'src/app/services/api.services';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  validateForm!: FormGroup;
  emailPattern = '[A-Za-z0-9._-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  Name = "^[a-zA-Z][0-9a-zA-Z .,'-]*$";
  age: any;
  email: any;
  contactno: any;
  nameUser: any;
  constructor(
    private titlePage: Title,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiServices: ApiServices
  ) {}

  ngOnInit(): void {
    this.titlePage.setTitle('Add User');
    this.validateForm = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$'),
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      age: [
        null,
        [Validators.required, Validators.pattern('^(?:1[8-9]|[2-5][0-9]|60)$')],
      ],
      cellno: [null, [Validators.required, Validators.pattern('[0-9]{11}')]],
    });

    this.checkFuntion();
  }
  checkFuntion() {
    this.nameUser = this.validateForm.get('name');
    this.email = this.validateForm.get('email');
    this.age = this.validateForm.get('age');
    this.contactno = this.validateForm.get('cellno');
  }
  submitUser() {
   
    if (this.validateForm.valid) {
     
      const body = {
        name: this.validateForm.controls['name'].value,
        email: this.validateForm.controls['email'].value,
        age: this.validateForm.controls['age'].value,
        cell: this.validateForm.controls['cellno'].value,
        
      };
      console.log(' the form ', body);


this.apiServices.post('employee', body).subscribe((data:any )=>{
if(data){
  console.log(" the data ",  data )
  this.apiServices.successNotification("Sucess ","Sucess")
this.validateForm.reset();
}
else{
  this.apiServices.errorNotification("Something Went Wrong", "Error")
}
})
    }
    else {
      this.apiServices.warningNotification("Check Input Feilds", "Warning")
      this.validateForm.markAllAsTouched();
    }
 
  }
}

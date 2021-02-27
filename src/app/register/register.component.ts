import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { users } from '../users/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup | any;

  get getUser() {
    return this.registerForm.controls;
  }

  get getAddress(){
    return this.registerForm['controls'];
  }

  constructor() {}

  data!: string[];
  onSubmit(user: users){
    this.submitted = true;
    console.log(this.getUser);
    console.log(user);
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({

      userDetails: new FormGroup({
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
      }),

      address: new FormGroup({
        line1: new FormControl('', Validators.required),
        line2: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pinCode: new FormControl('', Validators.required)
      })
      
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get f() {
    return this.loginForm.controls;
  }

  constructor() {}

  onSubmit(user: any) {
    this.submitted = true;
    console.log(this.loginForm.controls);
    console.log(user);
  }
  ngOnInit(): void {
  }
}

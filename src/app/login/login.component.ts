import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from "../users";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  submitted = false;
  loginForm!: FormGroup;

  get f() {
    return this.loginForm.controls;
  }


  onSubmit(user: any) {
    this.submitted = true;
    console.log(this.f);

    if (this.loginForm.invalid) {
      return;
    }

    

  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.usersService.getUsers().subscribe(console.log);
  }
}

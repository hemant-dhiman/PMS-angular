import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from "../users";
import { users } from '../users/users';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../users/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users_data!: users[];
  returnUrl: String;
  constructor(
    private usersService: UsersService, 
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    ) {}
  submitted = false;
  loading = false;
  loginForm!: FormGroup;

  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    //console.log(this.f);

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.usersService.login(this.f.userName['value'], this.f.password['value'])
    .pipe(first()).subscribe(data => {
      this.router.navigate(['/pet-entry']);
    },
     error => {
       this.alert.error(error);
       this.loading = false;
    });
    
    

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

    this.usersService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}

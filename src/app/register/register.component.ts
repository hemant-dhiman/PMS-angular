import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';
import { Users } from '../users/users';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  us: string[];
  data: Users[];
  submitted = false;
  loading = false;
  registerForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  get getUser() {
    return this.registerForm['controls'];
  }

  get getAddress() {
    return this.registerForm.controls.address['controls'];
  }

  ngOnInit(): void {

    // this.usersService.getAllUserNames('HD123').subscribe(console.log);
    // this.usersService
    //   .getAllUsersEmails('HD@datability.co')
    //   .subscribe(console.log);

    this.registerForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,3}'),
        ],
      ],

      address: this.formBuilder.group({
        line1: ['', Validators.required],
        line2: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        pinCode: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ],
        ],
      }),
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.registerForm.valid) {
      this.usersService
        .register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          (err) => {
            this.alertService.error(err);
            this.loading = false;
          }
        );
    }
  }

  // userNameValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     let usersNames: string;
  //      this.usersService.getAllUserNames().subscribe(a=>
  //       usersNames.push(a));
  //       return
  //       .pipe(
  //       map((response) => {
  //         return response ? { userName: true } : null;
  //       })
  //     );
  //   )
  //   };
  // }
}

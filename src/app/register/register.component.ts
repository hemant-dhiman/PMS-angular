import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UsersService } from '../users';
import { AlertService } from '../users/alert.service';
import { users } from '../users/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
  ) {}

  data: users[];
  submitted = false;
  loading = false;
  registerForm: FormGroup;

  get getUser() {
    return this.registerForm['controls'];
  }

  get getAddress() {
    return this.registerForm.controls.address['controls'];
  }

  onSubmit(user: users) {

    this.submitted = true;
    this.loading = true;
    if(this.registerForm.valid){
    this.usersService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      err => {
        this.alertService.error(err);
        this.loading = false;
      });
    }
    }


    // if (this.registerForm.valid) this.usersService.addUser(newUser).subscribe();
    // else console.log('please check all the entered value!');

    // this.usersService.getUsers().subscribe(
    //   a=> this.data = a
    // );

    // if (this.data != undefined && (this.data.length> 0))
    // localStorage.setItem('users', JSON.stringify(this.data));
    // //this.usersService.getUsers().subscribe(console.log);
    // console.log(this.data)
    // console.log("local storage!")
  //}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      //userDetails: new FormGroup({
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
      email: ['', [Validators.required, Validators.email]],
      //}),

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
}

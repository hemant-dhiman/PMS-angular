import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
})

export class TestComponentComponent implements OnInit {
  /**
   * variables
   * getter and setter
   * constructor
   * life cycle hooks
   * methods
   */
  registrationForm!: FormGroup;

  userNames = ['Hemant', 'Shiva', 'Shrey', 'Atul'];

  get registrationFControl() {
    return this.registrationForm.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: [null, [Validators.required], [this.userNameValidator()]],
    });
  }
  
  onSubmit() {
    
    console.log(this.registrationFControl['fullName'].errors);
  }

  //checking the username availability in database
  // i have used delay function so that our method 
  // behave like a HTTP response with delay of at least 1 sec
  checkUserNameExistence(userName: string): Observable<boolean> {
    return of(this.userNames.includes(userName)).pipe(delay(1000));
  }

  //Async Validator
  userNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkUserNameExistence(control.value).pipe(
        map((response) => {
          return response ? { userName: true } : null;
        })
      );
    };
  }
}

// Note: if we are using Service to validate USer Name 
//in that case we have to inject it in out components constructor
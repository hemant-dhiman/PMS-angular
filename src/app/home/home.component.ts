import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertComponent } from '../directives/alert.component';
import { AlertService } from '../users/alert.service';
import { users } from '../users/users';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: users;
  users: users[];

  constructor(
    private usersService: UsersService,
    private alertService: AlertService,
    private router: Router,
  ) {
    //this.usersService.getAll().subscribe(console.log);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }

  logout() {
    //localStorage.removeItem('currentUser');
    this.usersService.logout().pipe(first())
    .subscribe(
      data => {
        this.alertService.success('Logout successful', true);
        this.router.navigate(['/login']);
      },
      err => {
        this.alertService.error(err);
      });
  }

  ngOnInit(): void {
    if(this.currentUser === null)
    this.router.navigate(['/login'])
  }
}

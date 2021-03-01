import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable, OnInit } from '@angular/core';
import { users } from './users';

@Injectable({
  providedIn: 'root',
})
export class MockDataUsers implements OnInit{
  ngOnInit(): void {
    localStorage.setItem('users',JSON.stringify(this.users));
  }

   constructor(){}

      users = [
      {
        id: 0,
        fullName: 'Hemant Dhiman',
        userName: 'HD1234',
        email: 'hemant@datability.co',
        password: '12345',
        address: {
          line1: 'partap bhawan',
          line2: 'near Rani Taal',
          district: 'sirmaur',
          state: 'himachal pradesh',
          pinCode: '173001',
        },
      },

      {
        id: 1,
        fullName: 'Shiva Tomar',
        userName: 'shiv',
        email: 'shiva@datability.co',
        password: '123456',
        address: {
          line1: 'partap bhawan',
          line2: 'near Rani Taal',
          district: 'gaziabad',
          state: 'uttar pradesh',
          pinCode: '144411',
        },
      },
    ]

}

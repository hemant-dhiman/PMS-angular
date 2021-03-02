import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
            
        }else{
            return true;
            
        }

        // not logged in so redirect to login page with the return url
       //return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
       //return true;
        
    }
}
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class AlwaysAuthGuard implements CanActivate {
  constructor(private router: Router) {
    if (localStorage.getItem('welcome') && !localStorage.getItem('user')) {
      this.router.navigateByUrl('/login');
      console.log('non user et welcom');
    } else if (
      localStorage.getItem('user') &&
      localStorage.getItem('welcome')
    ) {
      console.log('user et welcom');

      this.router.navigateByUrl('/dashboard');
    } else {
      console.log('welcome');
    }
  }

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}

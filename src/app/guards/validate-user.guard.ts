import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.validateToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
        })
      );

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.validateToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
        })
      );


    //if (!sessionStorage.getItem('token')) {
    //  this.router.navigateByUrl('/auth')
    //  return false;
    //} else {
    //  return true;
    //}


  }
}

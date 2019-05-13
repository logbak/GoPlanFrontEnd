import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      if (!localStorage.getItem('id_token')) {
        this.router.navigate(['/login']);
        return obs.next(false);
      }
      else {
        return obs.next(true);
      }
    });
  }


}

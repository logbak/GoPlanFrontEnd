import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  private _jwtHelper = new JwtHelperService();

  constructor(
    private _router: Router, 
    private _authSvc: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

      // this will be passed from the route config
      // on the data property
      const expectedRole = route.data.expectedRole;
  
      const token = localStorage.getItem('id_token');
  
      // decode the token to get its payload
      const tokenPayload = this._jwtHelper.decodeToken(token);
      
      if (
        !this._authSvc.isAuthenticated() || 
        tokenPayload.role !== expectedRole
      ) {
        this._router.navigate(['/login']);
        return false;
      }
      return true;
    }
}

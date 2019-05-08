import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ApiUrl = 'http://goplanapi.azurewebsites.net/api'

@Injectable()
export class VacationService {

  constructor(private _http: HttpClient) { }

  getVacations() {
    return this._http.get(`${ApiUrl}/Notes`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}

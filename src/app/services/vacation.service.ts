import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vacation } from '../models/Vacation';

const Api_Url = 'http://goplanapi.azurewebsites.net/api'

@Injectable({
  providedIn: 'root'
})

export class VacationService {

  constructor(private _http: HttpClient) { }

  getVacations() {
    return this._http.get(`${Api_Url}/Vacation/Get`, { headers: this.getHeaders() });
  }

  getVacationGetByID(id) {
    return this._http.get(`${Api_Url}/Vacation/Get/${id}`, { headers: this.getHeaders() });
  }

  getVacationsByUser() {
    return this._http.get(`${Api_Url}/Vacation/GetByUser`, { headers: this.getHeaders() });
  }

  createVacation(vacation: Vacation){
    return this._http.post(`${Api_Url}/Vacation/Post`, vacation, { headers: this.getHeaders() });
  }

  updateVacation(vacation: Vacation){
    return this._http.put(`${Api_Url}/Vacation/Put`, vacation, { headers: this.getHeaders() });
  }

  deleteVacation(id: number) {
    return this._http.delete(`${Api_Url}/Vacation/Delete/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}

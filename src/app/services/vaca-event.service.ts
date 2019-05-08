import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VacaEvent } from '../models/VacaEvent';

const Api_Url = 'http://goplanapi.azurewebsites.net/api'

@Injectable({
  providedIn: 'root'
})
export class VacaEventService {

  constructor(private _http: HttpClient) { }

  getVacaEvents() {
    return this._http.get(`${Api_Url}/VacaEvent/Get`, { headers: this.setHeader() });
  }

  getVacaEventsByVacation(vacaId: number) {
    return this._http.get(`${Api_Url}/VacaEvent/GetByVaca?vacaId=${vacaId}`, { headers: this.setHeader() });
  }

  getVacaEvent(id: number) {
    return this._http.get(`${Api_Url}/VacaEvent/Get/${id}`, { headers: this.setHeader() });
  }

  createVacaEvent(vacaEvent: VacaEvent){
    return this._http.post(`${Api_Url}/VacEvent/Post`, vacaEvent, { headers: this.setHeader() });
  }

  updateVacaEvent(vacaEvent: VacaEvent){
    return this._http.put(`${Api_Url}/VacEvent/Put`, vacaEvent, { headers: this.setHeader() });
  }

  deleteVacaEvent(id: number) {
    return this._http.delete(`${Api_Url}/VacaEvent/Delete/${id}`, { headers: this.setHeader() });
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VacaEvent } from '../models/VacaEvent';

const Api_Url = 'http://goplanapi.azurewebsites.net/api'
// const Api_Url = 'http://localhost:56865/api'

@Injectable({
  providedIn: 'root'
})
export class VacaEventService {

  constructor(private _http: HttpClient) { }

  getVacaEvents() {
    return this._http.get(`${Api_Url}/VacaEvent/Get`, { headers: this.setHeader() });
  }

  getVacaEventsByVacation(vacaId: any) {
    return this._http.get(`${Api_Url}/VacaEvent/GetByVaca?vacaId=${vacaId}`, { headers: this.setHeader() });
  }

  getVacaEvent(id: any) {
    return this._http.get(`${Api_Url}/VacaEvent/Get/${id}`, { headers: this.setHeader() });
  }

  createVacaEvent(vacaEvent: VacaEvent){
    return this._http.post(`${Api_Url}/VacaEvent/Post`, this.removeNulls(vacaEvent), { headers: this.setHeader() });
  }

  updateVacaEvent(vacaEvent: VacaEvent){
    return this._http.put(`${Api_Url}/VacaEvent/Put`, this.removeNulls(vacaEvent), { headers: this.setHeader() });
  }

  deleteVacaEvent(id: number) {
    return this._http.delete(`${Api_Url}/VacaEvent/Delete/${id}`, { headers: this.setHeader() });
  }

  removeNulls(anyModel){
    Object.keys(anyModel).forEach((key) => (anyModel[key] == null) && delete anyModel[key]);
    console.log(anyModel);
    return anyModel;
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ApiUrl = 'http://goplanapi.azurewebsites.net/api/';

@Injectable({
  providedIn: 'root'
})
export class AdminPortalService {

  // constructor(private _http: HttpClient) { }

  // getVacationsList(){
  //   return this._http.get(`${ApiUrl}Vaction`, {headers: this.getHeaders()});
  // }

  // getVactionByID(ID: string) {
  //   return this._http.get(`${ApiUrl}Vacation/${ID}`, { headers: this.getHeaders() });
  // }

  // updateVacation(){
  //   return this._http.put(`${ApiUrl}Vacation/Put`, {header: this.getHeaders()});
  // }

  // deleteVacation(ID: number) {
  //   return this._http.delete(`${ApiUrl}Vacation/Delete/${ID}`, { headers: this.getHeaders() });

  // }

  // getEventTypeList(){
  //   return this._http.get(`${ApiUrl}EventType`, {headers: this.getHeaders()});
  // }

  // getEventTypeByID(ID: string) {
  //   return this._http.get(`${ApiUrl}EventType/${ID}`, { headers: this.getHeaders() });
  // }

  // updateEventType(){
  //   return this._http.put(`${ApiUrl}EventType/Put`, {header: this.getHeaders()});
  // }

  // deleteEventType(ID: number) {
  //   return this._http.delete(`${ApiUrl}EventType/Delete/${ID}`, { headers: this.getHeaders() });

  // }

  // private getHeaders(){
  //   return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  // }
}

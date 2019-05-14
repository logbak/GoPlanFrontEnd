import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventType } from '../models/EventType';

const ApiUrl = 'http://goplanapi.azurewebsites.net/api/';

const httpoptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    // 'Authorization' : localStorage.getItem('id_token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  constructor(private _http: HttpClient) { }

  getEventTypeList(){
    return this._http.get(`${ApiUrl}EventType/GetAll`, /*httpoptions,*/ {headers: this.getHeaders()});
  }

  getEventTypeByID(ID: string) {
    return this._http.get(`${ApiUrl}EventType/Get/${ID}`, httpoptions, /*{headers: this.getHeaders()}*/);
  }
  createEventType(eventtype: EventType){
    return this._http.post(`${ApiUrl}EventType/Post`, this.removeNulls(eventtype), { headers: this.getHeaders() });
  }

  updateEventType(){
    return this._http.put(`${ApiUrl}EventType/Put`, httpoptions, /*{headers: this.getHeaders()}*/);
  }

  deleteEventType(ID: number) {
    return this._http.delete(`${ApiUrl}EventType/Delete/${ID}`, httpoptions, /*{headers: this.getHeaders()}*/);

  }
  removeNulls(anyModel){
    Object.keys(anyModel).forEach((key) => (anyModel[key] == null) && delete anyModel[key]);
    console.log(anyModel);
    return anyModel;
  }

  private getHeaders(){
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}


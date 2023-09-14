import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../shared/model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _getNextActiviesEndPoint : string = 'api/Activity/NextActivities';

  constructor(  @Inject('urlBase') private _urlBase : string,
    private _httpClient : HttpClient ) { }

  getNextActivies(): Observable<Event[]>{
    return this._httpClient.get<Event[]>(this._urlBase + this._getNextActiviesEndPoint);
  }

}

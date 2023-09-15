import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event, Image } from '../../shared/model/event';
import { Registration } from 'src/app/shared/model/registration';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _getNextActiviesEndPoint : string = 'api/Activity/NextActivities';
  private _getMyActiviesEndPoint : string = 'api/Activity/MyActivities';
  private _getActivityByIdEndPoint : string = 'api/Activity/';
  private _getActivityImageByIdEndPointFinisher : string = '/Image';

  private _getRegistrationByEventIdEndPoint : string = 'api/Registration/';

  constructor(  @Inject('urlBase') private _urlBase : string,
    private _httpClient : HttpClient ) { }

  getNextActivies() : Observable<Event[]>{
    return this._httpClient.get<Event[]>( this._urlBase + this._getNextActiviesEndPoint );
  }

  getEventById( idEvent : number ) : Observable<Event>{
    return this._httpClient.get<Event>( this._urlBase + this._getActivityByIdEndPoint + idEvent );
  }

  getEventImageById( idEvent : number ) : Observable<Image>{
    return this._httpClient.get<Image>( this._urlBase + this._getActivityByIdEndPoint + idEvent + this._getActivityImageByIdEndPointFinisher );
  }

  getMyEvent() : Observable<Event[]>{
    return this._httpClient.get<Event[]>( this._urlBase + this._getMyActiviesEndPoint );
  }

  getNbGuest( eventId : number ) : Observable<number>{
    let value : number = -1;
    let response : BehaviorSubject<number> = new BehaviorSubject<number>(value);
    this._getRegistrationByEventId( eventId ).subscribe({
      next : ( requestResponse ) => {
        value = 0;
        for( let registration of requestResponse){
          value += 1 + registration.nbGuest;
        }

        response.next(value);
      }

    })
    return response.asObservable();
  }

  private _getRegistrationByEventId ( eventId : number ) : Observable<Registration[]>{
    return this._httpClient.get<Registration[]>( this._urlBase + this._getRegistrationByEventIdEndPoint + eventId);
  }
}

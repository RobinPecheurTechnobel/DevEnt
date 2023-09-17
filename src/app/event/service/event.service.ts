import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event, Image } from '../../shared/model/event';
import { Registration } from 'src/app/shared/model/registration';

/**
 * Service servant à fournir les évènements depuis le Backend
 */
@Injectable({
  providedIn: 'root'
})
export class EventService {
  /**
   * fin de l'url pour obtenir les events qui ne sont pas encore passé
   */ 
  private _getNextActiviesEndPoint : string = 'api/Activity/NextActivities';
  /**
   * fin de l'url pour obtenir les events dans lequel l'utilsateur participe
   */
  private _getMyActiviesEndPoint : string = 'api/Activity/MyActivities';
  /**
   * fin de l'url pour obtenir les informations d'un event
   * 
   * A besoin de l'id de l'event à observer
   */
  private _getActivityByIdEndPoint : string = 'api/Activity/';
  /**
   * partie supplémentaire à rajouter pour obtenir limage d'un event particulier
   */
  private _getActivityImageByIdEndPointFinisher : string = '/Image';

  /**
   * fin de l'url pour obtenir les enregistrements pour un event particulier
   * 
   * A besoin de l'id de l'event à observer
   */
  private _getRegistrationByEventIdEndPoint : string = 'api/Registration/';

  /**
   * Constructeur du service
   * 
   * @param _urlBase l'information global indiqué dans l' **app module** du début l'url 
   * 
   * l'adresse du Backend à contacter
   * 
   * @param _httpClient Service pour envoyer des requêtes http
   */
  constructor(  @Inject('urlBase') private _urlBase : string,
    private _httpClient : HttpClient ) { }

  /**
   * Fonction pour récupérer les évènements futurs
   * 
   * @returns {Observable<Event[]>} la requête vers le Backend auquel il faudra s'abonner
   * 
   * Si ça se passe bien le retour sera de type liste d'Event
   */
  getNextActivies() : Observable<Event[]>{
    return this._httpClient.get<Event[]>( this._urlBase + this._getNextActiviesEndPoint );
  }
  /**
   * Function pour obtenir les informations d'un event donné
   * 
   * @returns {Observable<Event>} la requête vers le Backend auquel il faudra s'abonner
   * 
   * Si ça se passe bien le retour sera de type Event
   */
  getEventById( idEvent : number ) : Observable<Event>{
    return this._httpClient.get<Event>( this._urlBase + this._getActivityByIdEndPoint + idEvent );
  }
  /**
   * Function pour obtenir l'image associé d'un event donné
   * 
   * @returns {Observable<Image>} la requête vers le Backend auquel il faudra s'abonner
   * 
   * Si ça se passe bien le retour sera de type image
   */
  getEventImageById( idEvent : number ) : Observable<Image>{
    return this._httpClient.get<Image>( this._urlBase + this._getActivityByIdEndPoint + idEvent + this._getActivityImageByIdEndPointFinisher );
  }

  /**
   * Function pour obtenir l'ensemble des events dans lequel utilisateur participe
   * 
   * @returns {Observable<Event[]>} la requête vers le Backend auquel il faudra s'abonner
   * 
   * Si ça se passe bien le retour sera de type liste d'Event
   */
  getMyEvent() : Observable<Event[]>{
    return this._httpClient.get<Event[]>( this._urlBase + this._getMyActiviesEndPoint );
  }

  /**
   * Function calculant l'occupation d'un event donné
   * 
   * A besoin d'attendre le retour d'une requête
   * 
   * @param {number} eventId l'id de l'event observé
   * 
   * @returns {Observable<number>} la requête vers le Backend auquel il faudra s'abonner
   * 
   * Si ça se passe bien le retour sera un calcul du nombre de particpant à l'event
   */
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

  /**
   * Function faisant la requête pour obtenir l'ensemble des participants d'un event donné
   * 
   * @param {number} eventId l'id de l'event observé
   * 
   * @returns  {Observable<Event[]>} la requête vers le Backend auquel il faudra s'abonner
   * 
   * Si ça se passe bien le retour sera de type liste d'Event
   */
  private _getRegistrationByEventId ( eventId : number ) : Observable<Registration[]>{
    return this._httpClient.get<Registration[]>( this._urlBase + this._getRegistrationByEventIdEndPoint + eventId);
  }
}

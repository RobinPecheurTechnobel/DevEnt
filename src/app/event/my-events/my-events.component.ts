import { Component } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../../shared/model/event';

/**
 * Composant responsable de la page affichant les évènements auxquels l'utilisateurs participent
 */
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent {
  /**
   * listes des events dans lesquels l'utilisateur participe
   */
  events : Event[] = [];

  /**
   * Constructeur du composant
   * 
   * @param _eventService Sercive pour contacter le server concernant les events (activity selon le Backend)
   */
  constructor(private _eventService : EventService) {}
  
  /**
   * Fonction s'activant à début du composant
   * 
   * S'occupe d'aller chercher les "*participations*" de l'utilisateur
   * 
   * Visiblement, on peut accéder ici à des évènemnts passés
   */
  ngOnInit(): void {
    this._eventService.getMyEvent().subscribe({
      next : ( value ) => {
        this.events = value;
      }
    })
  }
  
  /**
   * Fonction renvoyant les events futurs parmis l'ensemble des events reçu par la requête
   * 
   * @returns {Event[]} liste d'event filtré
   */
  getOnGoingEvent() : Event[]{
    return this.events.filter(event => new Date(event.endDate) > new Date());
  }

  /**
   * Fonction renvoyant l'ensemble des events passés
   * 
   * @returns {Event[]} liste d'event filtré
   */
  getPastEvent() : Event[]{
    return this.events.filter(event => new Date(event.endDate) <= new Date());
  }
}

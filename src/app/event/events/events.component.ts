import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../../shared/model/event';

/**
 * Composant responsable de la page qui affiche les évènements à venir
 */
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  /**
   * liste des parents reçu et affiché
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
   * S'occupe d'aller chercher les évènements à venir
   */
  ngOnInit(): void {
    this._eventService.getNextActivies().subscribe({
      next : ( value ) => {
        this.events = value;
      }
    })
  }
}

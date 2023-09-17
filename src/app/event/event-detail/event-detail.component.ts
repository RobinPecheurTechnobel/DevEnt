import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/shared/model/event';
import { EventService } from '../service/event.service';
import { Observable } from 'rxjs';
import { Member } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/service/auth.service';

/**
 * Composant responsable de la page qui donne les **détails d'un éévènement spécifique**
 */
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit{

  /**
   * Objet utilisateur
   * 
   * peut-être :
   * - { undefined } s'il n'y a pas d'utilisateur connecté
   * - { member } s'il y en a un
   */
  user : Member | undefined;

  /**
   * évènement observé
   */
  event : Event | undefined;

  /**
   * id de l'event observé
   */
  eventId : number;

  /**
   * Nombre de personne actuellement "inscrite" (invités inclus)
   */
  occupation : number | undefined;

  /**
   * Constructeur du composant
   * 
   * @param _authService Service d'authentifiant
   * @param _activeRoute apporte des informations sur le *chemin* actif
   * @param _eventService  Sercive pour contacter le server concernant les events (activity selon le Backend)
   */
  constructor(private _authService : AuthService,
    private _activeRoute : ActivatedRoute,
      private _eventService : EventService ){

    this.eventId = this._activeRoute.snapshot.params["id"];

  }

  /**
   * fonction cherchant l'information de l'utilisateur ( à changer pour optionner, utilisons l'id dans le localhost)
   * 
   * Elle va aussi chercher l'event observé en parrallèle.
   * 
   * Une fois les informations de l'event sont récupérées, une requête est envoyé pour obtenir l'occupation de celle-ci.
   */
  ngOnInit(): void {
    this._authService.$connectedMember.subscribe({
       next : ( value ) => { 
         this.user = value; 
       }
     })

    this._eventService.getEventById( this.eventId ).subscribe({
      next : ( response ) => {
        this.event = response;

        this._eventService.getEventImageById( this.eventId ).subscribe({
          next : ( response ) => {
            this.event!.image = response;
          }
        })
        
        this._eventService.getNbGuest( this.event!.id! ).subscribe({
          next : ( response ) => { this.occupation = response; }
        })
      }
    })
  }

  /**
   * Fonction permettant la distinction entre les event futurs et celles passés
   * 
   * Permet d'éviter de modifier ou de particper à un event passé
   * 
   * @returns {boolean} est-ce que l'event est déjà passé ?
   */
  isPastEvent() : boolean {
    return new Date(this.event!.endDate) <= new Date();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/shared/model/event';
import { EventService } from '../service/event.service';
import { Observable } from 'rxjs';
import { Member } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/service/auth.service';



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

  event : Event | undefined;

  eventId : number;

  occupation : number | undefined;


  constructor(private _authService : AuthService,
    private _activeRoute : ActivatedRoute,
      private _eventService : EventService ){

    this.eventId = this._activeRoute.snapshot.params["id"];

  }


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

  isPastEvent() : boolean {
    return new Date(this.event!.endDate) <= new Date();
  }
}

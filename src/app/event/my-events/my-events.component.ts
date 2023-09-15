import { Component } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../../shared/model/event';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent {
  events : Event[] = [];

  constructor(private _eventService : EventService) {}
  
  ngOnInit(): void {
    this._eventService.getMyEvent().subscribe({
      next : ( value ) => {
        this.events = value;
      }
    })
  }
  

  getOnGoingEvent() : Event[]{
    return this.events.filter(event => new Date(event.endDate) > new Date());
  }
  getPastEvent() : Event[]{
    return this.events.filter(event => new Date(event.endDate) <= new Date());
  }
}

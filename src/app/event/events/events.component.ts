import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../../shared/model/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events : Event[] = [];

  constructor(private _eventService : EventService) {}
  
  ngOnInit(): void {
    this._eventService.getNextActivies().subscribe({
      next : ( value ) => {
        this.events = value;
      }
    })
  }
}

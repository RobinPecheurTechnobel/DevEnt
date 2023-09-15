import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';

import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MyEventsComponent } from './my-events/my-events.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventDetailComponent,
    MyEventsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }

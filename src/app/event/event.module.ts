import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';

import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventDetailComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }

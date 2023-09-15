import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  {path:"", component: EventsComponent},
  {path:"myEvents", component: MyEventsComponent},
  //TODO page erreur 404
  {path:"**", component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MyEventsComponent } from './my-events/my-events.component';

const routes: Routes = [
  {path:"", component: EventsComponent},
  {path:"myEvents", component: MyEventsComponent},
  {path:":id", component: EventDetailComponent},
  //TODO page erreur 404
  {path:"**", component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }

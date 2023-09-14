import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { InscriptionPageComponent } from './inscription-page/inscription-page.component';
import { EventModule } from './event/event.module';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginPageComponent},
  { path: "inscription", component: InscriptionPageComponent},
  { path: "event", loadChildren: () => import('./event/event.module').then(m => m.EventModule)  },
  { path: "**", redirectTo: "/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

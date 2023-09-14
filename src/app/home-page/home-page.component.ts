import { Component, OnInit } from '@angular/core';
import { Member } from '../shared/model/user';
import { AuthService } from '../shared/service/auth.service';

/**
 * Composant responsable du corps de la page d'accueil
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  /**
   * Objet utilisateur
   * 
   * peut-être :
   * - { undefined } s'il n'y a pas d'utilisateur connecté
   * - { member } s'il y en a un
   */
  user : Member | undefined;

  /**
   * constructeur du composant
   * 
   * @param { AuthService } _authService injection du service d'authentification
   */
  constructor(private _authService : AuthService) {
    
  }
  
  /**
   * Méthode utilisé pour s'**abonner** dans le service d'authentification **au modification de la variable connectedUser** designant l'utilisateur connecté
   */
  ngOnInit(): void {
   this._authService.$connectedMember.subscribe({
      next : ( value ) => { 
        this.user = value; 
      }
    })
  }

}

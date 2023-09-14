import { Component, OnInit } from '@angular/core';
import { Member, User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

/**
 * Composant responsable de la navbar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  /**
   * Objet utilisateur
   * 
   * peut-être :
   * - { undefined } s'il n'y a pas d'utilisateur connecté
   * - { member } s'il y en a un
   */
  user : Member | undefined;

  /**
   * Constructeur du composant
   * 
   * @param { AuthService } _authService injection du service d'authentificateur
   * @param { Router } _router injection du service router pour la gestion des redirection
   */
  constructor(private _authService : AuthService,
    private _router : Router) {
    
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

  /**
   * Methode pour la deconnection de l'utilisateur connecté
   * 
   * supression du token dans le localstorage
   * 
   * redirection vers la page d'accueil
   */
  disconnection () : void{    
    //trigger la deconnexion générale
    this._authService.disconnection()

    //redirection vers l'accueil
    this._router.navigateByUrl("");

  }
}

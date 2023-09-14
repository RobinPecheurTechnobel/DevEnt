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
   *
   */
  constructor(private _authService : AuthService,
    private _router : Router) {
    
  }
  
  ngOnInit(): void {
   this._authService.$connectedMember.subscribe({
      next : ( value ) => { 
        this.user = value; 
      }
    })
  }

  disconnection () : void{
    //vider le localStorage
    localStorage.clear();
    //trigger la deconnexion générale
    this._authService.disconnection()

    //redirection vers l'accueil
    this._router.navigateByUrl("");

  }
}

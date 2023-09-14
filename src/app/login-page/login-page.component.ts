import { Component } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';

/**
 * Composant servant à la page de login
 * 
 * C'est ici qu'un utilisateur peut se connecter
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  /**
   * chaine de caractère qui contiendra soit le **mail**, soit le **pseudo** de l'utilisateur
   * 
   * L'utilisateur est libre d'utiliser celui des 2 qu'il préfère
   */
  identifier :string = '';
  /**
   * chaine de caractère qui contiendra le mot de passe de l'utilisateur
   */
  password : string = '';

  /**
   * Chaine de caractère prévu pour recevoir les erreurs renvoyées par le Backend
   * 
   * N'apparaît pas s'il est "vide"
   */
  errorMessage : string = '';

  /**
   * constructeur du composant
   * 
   * @param _authService service d'authentification
   * @param _router Service pour les routes, sert pour les redirections
   */
  constructor(private _authService: AuthService, private _router : Router) {
    
  }

  /**
   * Methode utiliser dans la tentative d'authentification de l'utilisateur
   * 
   * Si ça se passe bien, le token reçu est stocké dans le localstorage
   * 
   * Sinon, on reçoit une erreure qu'on affiche
   */
  connection() : void
  {
    this._authService.login(this.identifier, this.password).subscribe({
      next : ( value ) => {
        // redirection
        this.errorMessage = '';
        this._router.navigateByUrl("");
      },
      error : ( error ) => {
        //indiquer l'erreur
        this.errorMessage = error;
      }
    })
  }
}

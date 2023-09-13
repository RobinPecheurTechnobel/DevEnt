import { Component } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  identifier :string = '';
  password : string = '';

  errorMessage : string = '';

  /**
   *
   */
  constructor(private _authService: AuthService, private _router : Router) {
    
  }

  connection() : void
  {
    this._authService.login(this.identifier, this.password).subscribe({
      next : ( value ) => {
        // redirection
        this.errorMessage = '';
      },
      error : ( error ) => {
        //indiquer l'erreur
        this.errorMessage = error;
      }
    })
  }
}

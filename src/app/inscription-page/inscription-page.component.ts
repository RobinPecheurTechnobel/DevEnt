import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../shared/model/user';
import { AuthService } from '../shared/service/auth.service';
import { confirmationValidator } from '../shared/validator/confimation.validator';
import { Router } from '@angular/router';

/**
 * Composant responsable de la page d'inscription des utilisateurs
 */
@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss']
})
export class InscriptionPageComponent {

  /**
   * Chaine de caractère pour les erreurs (reçu de la part du server)
   * 
   * Ne sera afficher que s'il contient quelque chose
   */
  errorMessage : string = '';

  /**
   * Forumlaire d'inscription
   */
  registerForm : FormGroup;

  /**
   * Constructeur du composant
   * 
   * @param { FormBuilder } _fb Service de gestion de formulaire
   * @param { AuthService } _authService Service d'identifiactaion
   * @param { Router } _router Service pour les routes, utilisé pour les redirections 
   */
  constructor( private _fb : FormBuilder,
    private _authService : AuthService, 
    private _router : Router) {
      
    this.registerForm = this._fb.group({
      pseudo : [null,[Validators.required],[]],
      email : [null,[Validators.required, Validators.email],[]],
      password : [null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?é#èçàµù]).{5,}/)],[]],
      confirmPassword : [null,[],[]],
      firstName : [null,[Validators.required],[]],
      lastName : [null,[Validators.required],[]],
    });

    this.registerForm.controls["confirmPassword"].setValidators(confirmationValidator(this.registerForm.controls["password"]));
  }

  /**
   * Méthode d'inscription de notre nouvel utilisateur
   * 
   * si le formulaire est **bien remplit**, on fait appel au service d'authentification, puis on est redirigé sur la page d'accueil
   * 
   * Dans le cas contraire, l'utilisateur est invité à corriger les éléments "incorrects" du formulaire 
   */
  register() :void{
    if(this.registerForm.valid){
      this._authService.register(this.registerForm.value as Member).subscribe({
        next : ( value ) => {
          this.errorMessage = '';
          //lancement de requête pour se logger
          this._authService.login(this.registerForm.value.pseudo, this.registerForm.value.password);
          // redirection page d'accueil
          this._router.navigateByUrl("");
        },
        error : ( error ) => {
          this.errorMessage = 'Une erreur server est survenue';
        }
      })
    }
    else{
      this.errorMessage = '';
      this.registerForm.markAllAsTouched();
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../shared/model/user';
import { AuthService } from '../shared/service/auth.service';
import { confirmationValidator } from '../shared/validator/confimation.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss']
})
export class InscriptionPageComponent {

  errorMessage : string = '';

  registerForm : FormGroup;

  /**
   *
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

  register() :void{
    if(this.registerForm.valid){
      //TODO do when it's ok
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

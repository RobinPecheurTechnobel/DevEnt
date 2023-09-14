import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../shared/model/user';
import { AuthService } from '../shared/service/auth.service';
import { confirmationValidator } from '../shared/validator/confimation.validator';

@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss']
})
export class InscriptionPageComponent {
  registerForm : FormGroup;

  /**
   *
   */
  constructor( private _fb : FormBuilder,
    private _authService : AuthService) {
    this.registerForm = this._fb.group({
      pseudo : [null,[Validators.required],[]],
      email : [null,[Validators.required, Validators.email],[]],
      //TODO confirmation password
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
          console.log( value );
        },
        error : ( error ) => {
          console.log(error);
        },
        complete : () => {

        }
      })
    }
    else{
      //TODO do when it is not ok
      console.log("oups");
      this.registerForm.markAllAsTouched();
    }
  }
}

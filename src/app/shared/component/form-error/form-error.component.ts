import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * composant utilisé indiquer quand un champs donné d'un formaulaire n'est pas valide
 */
@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  inputs: ['control']
})
export class FormErrorComponent {
  /**
   * le champs du formulaire controllé
   */
  control? : AbstractControl|null;
}

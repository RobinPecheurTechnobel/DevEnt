import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  inputs: ['control']
})
export class FormErrorComponent {
  control? : AbstractControl|null;
}

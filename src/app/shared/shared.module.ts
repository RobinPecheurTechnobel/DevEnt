import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './component/form-error/form-error.component';



@NgModule({
  declarations: [
    FormErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent
  ]
})
export class SharedModule { }

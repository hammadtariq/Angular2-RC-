import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleFormComponent } from './simpleForm/simpleForm.component';
import { FormGroupComponent } from './formGroup/formGroup.component';
import { FormValidationComponent } from './formValidation/formValidation.component';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, SimpleFormComponent, FormGroupComponent, FormValidationComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

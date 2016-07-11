import { Component } from '@angular/core';
import { SimpleFormComponent } from './simpleForm/simpleForm.component';
import { FormGroupComponent } from './formGroup/formGroup.component';
import { FormValidationComponent } from './formValidation/formValidation.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl:'app.html',
  directives:[SimpleFormComponent, FormGroupComponent, FormValidationComponent],
  styles:[`
  .columns{
      float:left;
      padding:50px;
      border:1px solid blue;
  }
  .center{
    text-align:center;
  }

  `]
})
export class AppComponent { }

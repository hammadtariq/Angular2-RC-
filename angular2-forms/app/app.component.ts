import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl:'app.html',
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

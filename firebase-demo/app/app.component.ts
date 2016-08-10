import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-app',
  template:`
  <h1>My First Angular 2 Firebase app</h1>
  <ul>
      <li class="text" *ngFor="let item of items | async">
        {{item.$value}}
      </li>
  </ul>
  `
})

export class AppComponent implements OnInit {
    items: FirebaseListObservable<any[]>;
    
    constructor(private af:AngularFire){}

    ngOnInit(){
      this.items = this.af.database.list('')
      console.log("data: ",this.items)
    }

 }

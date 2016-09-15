import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAZB2a7SEmbQQd4r236nQNrRtiBnuhF5hk",
  authDomain: "todo-list-8f989.firebaseapp.com",
  databaseURL: "https://todo-list-8f989.firebaseio.com",
  storageBucket: "todo-list-8f989.appspot.com"
};

@NgModule({
  imports:      [ BrowserModule, AngularFireModule.initializeApp(firebaseConfig) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

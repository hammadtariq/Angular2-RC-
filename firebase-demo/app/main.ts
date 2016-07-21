import { bootstrap }    from '@angular/platform-browser-dynamic';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { AppComponent } from './app.component';
bootstrap(AppComponent,[FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyAZB2a7SEmbQQd4r236nQNrRtiBnuhF5hk",
    authDomain: "todo-list-8f989.firebaseapp.com",
    databaseURL: "https://todo-list-8f989.firebaseio.com",
    storageBucket: "todo-list-8f989.appspot.com"
  })
  ]);
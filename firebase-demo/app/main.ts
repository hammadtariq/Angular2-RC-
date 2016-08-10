import { platformBrowserDynamic }    from '@angular/platform-browser-dynamic';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule,[FIREBASE_PROVIDERS,
      // Initialize Firebase app  
      defaultFirebase({
        apiKey: "AIzaSyAZB2a7SEmbQQd4r236nQNrRtiBnuhF5hk",
        authDomain: "todo-list-8f989.firebaseapp.com",
        databaseURL: "https://todo-list-8f989.firebaseio.com",
        storageBucket: "todo-list-8f989.appspot.com"
      })
  ]).catch((err:any) => console.error("error from bootstrap: ",err));
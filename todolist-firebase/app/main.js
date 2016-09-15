"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var angularfire2_1 = require('angularfire2');
var app_module_1 = require('./app.module');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, [angularfire2_1.FIREBASE_PROVIDERS,
    // Initialize Firebase app  
    angularfire2_1.defaultFirebase({
        apiKey: "AIzaSyAZB2a7SEmbQQd4r236nQNrRtiBnuhF5hk",
        authDomain: "todo-list-8f989.firebaseapp.com",
        databaseURL: "https://todo-list-8f989.firebaseio.com",
        storageBucket: "todo-list-8f989.appspot.com"
    })
]).catch(function (err) { return console.error("error from bootstrap: ", err); });
//# sourceMappingURL=main.js.map
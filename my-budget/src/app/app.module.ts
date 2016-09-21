import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }  from './app.routing';
// import { AngularFireModule } from 'angularfire2';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
// Must export the config
// export const firebaseConfig = {
//   apiKey: "AIzaSyAZB2a7SEmbQQd4r236nQNrRtiBnuhF5hk",
//   authDomain: "todo-list-8f989.firebaseapp.com",
//   databaseURL: "https://todo-list-8f989.firebaseio.com",
//   storageBucket: "todo-list-8f989.appspot.com"
// };

import { MainService } from './shared/main.service';
import { CanActivateViaAuthGuard } from './shared/auth-guard.service';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { TodayBudgetComponent } from './today-budget/today-budget.component';
import { BudgetHistoryComponent } from './budget-history/budget-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AddBudgetComponent,
    TodayBudgetComponent,
    BudgetHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    // AngularFireModule.initializeApp(firebaseConfig),
    MdButtonModule.forRoot(), MdCardModule.forRoot(), MdInputModule.forRoot(),
    MdToolbarModule.forRoot(), MdProgressCircleModule.forRoot()
  ],
  providers: [ appRoutingProviders, MainService, CanActivateViaAuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

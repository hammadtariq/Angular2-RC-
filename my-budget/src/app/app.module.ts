import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { routing, appRoutingProviders }  from './app.routing';

import { IteratableObjectPipe } from './shared/iteratableObject.pipe';
import { MainService } from './shared/main.service';
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
    BudgetHistoryComponent,
    IteratableObjectPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    MdButtonModule.forRoot(), MdCardModule.forRoot(), MdInputModule.forRoot(),
    MdToolbarModule.forRoot(), MdProgressCircleModule.forRoot()
  ],
  providers: [ appRoutingProviders, MainService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

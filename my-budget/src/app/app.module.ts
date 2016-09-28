import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
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
    MaterialModule.forRoot(),
  ],
  providers: [ appRoutingProviders, MainService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

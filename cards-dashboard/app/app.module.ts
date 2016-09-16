import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { DashboardService } from './dashboard/shared/dashboard.service' 
import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component' 
import { ListComponent } from './list/list.component' 
import { CardComponent } from './card/card.component' 

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, DashboardComponent, CardComponent, ListComponent ],
  providers: [
    DashboardService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

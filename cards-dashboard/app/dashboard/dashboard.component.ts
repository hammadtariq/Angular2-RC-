import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';
import { ICards } from './shared/card.interface';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  cards:ICards = {active:[],failed:[],delayed:[],complete:[]}

  constructor(public dashService:DashboardService){}
  
  ngOnInit(){
    this.dashService.getLogs()
    .subscribe(
      res => this.cards = res,
      () => {
        alert("ERROR 503: Server is not responding right now.");
        console.log("ERROR")
      },
      () => console.log("Cards: ",this.cards)
      );
  }

 }

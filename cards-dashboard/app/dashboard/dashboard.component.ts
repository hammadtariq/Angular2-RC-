import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';
import { ICards } from './shared/card.interface';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  cards: ICards = { inactive: [], active: [], failed: [], delayed: [], complete: [] }

  constructor(public dashService: DashboardService) { }

  ngOnInit() {
    this.getLogs();
    setInterval(() => {
      this.getLogs();
    }, 10000);
  }

  getLogs() {
    this.dashService.getLogs()
      .subscribe(
      res => this.cards = res,
      () => {
        console.log("ERROR 503: Server is not responding right now.");
      },
      () => console.log("Cards: ", this.cards)
      );
  }

}

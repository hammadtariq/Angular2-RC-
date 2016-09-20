import { Component, OnInit } from '@angular/core';

import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-budget-history',
  templateUrl: './budget-history.component.html',
  styleUrls: ['./budget-history.component.css']
})
export class BudgetHistoryComponent implements OnInit {

  history: Object;
  historyKeys: Array<string>;
  dataRecieved: boolean;
  message: string;
  constructor(private mainService: MainService) {
    this.dataRecieved = false;
  }

  ngOnInit() {
    this.mainService.getHistory()
    .then((res) => {
      this.history = res;
      console.log('history obj : ', res);
      this.historyKeys = Object.keys(this.history);
      console.log(this.historyKeys);
      this.dataRecieved = true;
    }, (err) => {
      this.message = err;
      this.dataRecieved = true;
      console.log('error:', err);
    });
  }

}

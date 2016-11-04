import { Component, OnInit } from '@angular/core';

import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-budget-history',
  templateUrl: './budget-history.component.html',
  styleUrls: ['./budget-history.component.css']
})
export class BudgetHistoryComponent implements OnInit {

  history: Object;
  monthKeys: Array<string>;
  dataRecieved: boolean;
  message: any;
  dayKeys: Array<any>;
  count: number;
  toggle: boolean;
  constructor(private mainService: MainService) {
    this.count = 0;
    this.toggle = false;
    this.dataRecieved = false;
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.mainService.getHistory()
      .then((snapshot) => {
        if (!snapshot.val()) {
          throw new Error('No history available yet.');
        }else {
          this.history = snapshot.val();
          console.log('history obj : ', this.history);
          this.dataRecieved = true;
        }
      })
      .catch((err) => {
        this.message = err;
        this.dataRecieved = true;
        console.log('error:', err);
      });
  }

  toggleMe(id) {
    if (this.count % 2 === 0) {
      this.toggle = id;
    }else {
      this.toggle = id;
    }
    this.count++;
  }

}

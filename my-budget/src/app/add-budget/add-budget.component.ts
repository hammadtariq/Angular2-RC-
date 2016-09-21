import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent implements OnInit {

  currentMonth: string;
  placeholderText: string;
  spendPerDay: number;
  currentDate: Date;
  username: ActivatedRoute;
  oldBudget: any = '';
  btnLabel: string = 'Add';
  editFlag: boolean;
  constructor(private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit() {
      let { params } = this.route.snapshot;
      params['username'] === 'edit' && (this.editFlag = true, this.getBudget());
      this.username = params['username'] !== 'edit' ?
      params['username'] : localStorage['username'];
      this.currentDate = this.getCurrentDate();
  }

  getBudget() {
    this.mainService.getBudget()
    .then((res) => {
      console.log('old budget: ', res);
      this.oldBudget = res['totalBudget'];
    }, (err) => {
      console.log(err);
    });
  }

  totalBudget(budget) {
    console.log('total budget: ', budget);
    this.mainService.calculateBudget(this.username, budget);
    // this.route.snapshot.params['username'] === 'edit' ?
    // this.mainService.editBudget(this.username, budget) : this.mainService.calculateBudget(this.username, budget);
  }

  editBudget(budget) {
    this.mainService.editBudget(this.username, budget);
  }

  cancelEdit(){
    this.mainService.cancelEdit()
  }

  getCurrentDate() {
    const date = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.currentMonth = monthNames[date.getMonth()];
    this.placeholderText = 'Enter budget for ' + this.currentMonth;
    console.log(date);
    return date;
  }

}

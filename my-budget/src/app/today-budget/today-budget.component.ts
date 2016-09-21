import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-today-budget',
  templateUrl: './today-budget.component.html',
  styleUrls: ['./today-budget.component.css']
})
export class TodayBudgetComponent implements OnInit {
  budgetInfo = {total: '', spend: '', update: ''};
  budgetRef: string;
  message: any = '';
  currentDate: Object;
  dataRecieved: boolean;

  constructor(private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit() {
    let { budgetRef } = this.route.snapshot.params;
    this.dataRecieved = false;
    this.currentDate = this.getCurrentDate();
    this.budgetRef = budgetRef !== 'back' ? budgetRef : localStorage['budgetRef'] ;
    this.getBudgetInfo();
  }

  getCurrentDate() {
    const date = new Date();
    return date;
  }

  getBudgetInfo() {
        this.mainService.moneyToSpend(this.budgetRef)
        .then( snapshot => {
          console.log('snap : ', snapshot.val());
          this.budgetInfo = Object.assign({}, this.budgetInfo, {
            total: snapshot.val().totalBudget,
            spend: snapshot.val().spendPerDay,
            update: snapshot.val().updatedBudget
          });
          this.dataRecieved = true;
        })
        .catch(err => console.log('err from budget : ', err));
  }

  totalSpended(todaySpended) {
    console.log('todaySpended: ', todaySpended.value);
    this.mainService.todaySpended(this.budgetRef, todaySpended.value)
    .then(
      (res) => {
        this.message = res;
        todaySpended.value = '';
        setTimeout(() => {
            this.message = '';
        }, 2000);
      },
      (res) => {
        this.message = res;
        setTimeout(() => {
            this.message = '';
        }, 2000);
        this.updateBudget(todaySpended.value);
        todaySpended.value = '';
      });
  }

  updateBudget(todaySpended) {
    let { total, update }: any = this.budgetInfo;
    let updatedBudget = update === '' ? (total - todaySpended) : (update - todaySpended);
    this.mainService.updateBudget(this.budgetRef, updatedBudget);
    this.getBudgetInfo();
  }

}

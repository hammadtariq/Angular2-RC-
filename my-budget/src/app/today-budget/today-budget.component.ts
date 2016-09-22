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
  categories: Array<String>;

  constructor(private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit() {
    this.categories = ['Travel', 'Food', 'Medical', 'Other'];
    let { budgetRef } = this.route.snapshot.params;
    this.dataRecieved = false;
    this.currentDate = this.mainService.leftDays();
    this.budgetRef = budgetRef !== 'back' ? budgetRef : localStorage['budgetRef'] ;
    this.getBudgetInfo();
  }

  getBudgetInfo() {
        this.mainService.moneyToSpend(this.budgetRef)
        .then( snapshot => {
          console.log('snap : ', snapshot.val());
          let {totalBudget, spendPerDay, updatedBudget} = snapshot.val();
          this.budgetInfo = Object.assign({}, this.budgetInfo, {
            total: totalBudget, spend: spendPerDay, update: updatedBudget
          });
          this.dataRecieved = true;
        })
        .catch (err => console.log('err from budget : ', err));
  }

  totalSpended(selectedCategory, item, todaySpended) {
    console.log('todaySpended: ', todaySpended.value);
    this.mainService.todaySpended(this.budgetRef, selectedCategory.value, item.value, todaySpended.value)
    .then(
      (res) => {
        this.message = res;
        todaySpended.value = '';
        item.value = '';
        setTimeout(() => {
            this.message = '';
        }, 4000);
      },
      (res) => {
        this.message = res;
        setTimeout(() => {
            this.message = '';
        }, 4000);
        this.updateBudget(todaySpended.value);
        todaySpended.value = '';
        item.value = '';
      });
  }

  updateBudget(todaySpended) {
    let { total, update }: any = this.budgetInfo;
    let updatedBudget = update === '' ? (total - todaySpended) : (update - todaySpended);
    this.mainService.updateBudget(this.budgetRef, updatedBudget);
    this.getBudgetInfo();
  }

  logout() {
    this.mainService.logout();
  }

}

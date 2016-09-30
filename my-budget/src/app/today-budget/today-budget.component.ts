import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MainService } from '../shared/main.service';
import { itemNameValidator, amountValidator  } from '../shared/form.validators';

@Component({
  selector: 'app-today-budget',
  templateUrl: './today-budget.component.html',
  styleUrls: ['./today-budget.component.css']
})
export class TodayBudgetComponent implements OnInit, AfterViewInit {
  budgetInfo = {income: '', budget: '', spend: '', update: ''};
  budgetRef: string;
  message: any = '';
  days: Object;
  dataRecieved: boolean = false;
  categories: Array<String> = ['Travel', 'Food', 'Medical', 'Other']; ;
  myForm: FormGroup;
  units: Array<string> = ['kg', 'dozen', 'item', 'other'];
  counter: number = 0;
  constructor(fb: FormBuilder, private route: ActivatedRoute, private mainService: MainService) {
      this.myForm = fb.group({
          'quantity' : [''],
          'unit' : [''],
          'category' : ['', Validators.required],
          'itemName' : ['', Validators.compose([Validators.required, itemNameValidator])],
          'amount': ['', Validators.compose([Validators.required, amountValidator])],
      });

   }

  ngOnInit() {
    let { budgetRef } = this.route.snapshot.params;
    this.days = this.mainService.leftDays() + 1;
    this.budgetRef = budgetRef !== 'back' ? budgetRef : localStorage['budgetRef'] ;
  }

  ngAfterViewInit() {
  }

  getBudgetInfo() {
    if (this.counter >= 1) { return; }else {
      this.mainService.moneyToSpend(this.budgetRef)
      .then( snapshot => {
        console.log('snap : ', snapshot.val());
        let {totalIncome, totalBudget, spendPerDay, totalSaving, updatedBudget} = snapshot.val();
        this.budgetInfo = Object.assign({}, this.budgetInfo, {
          income: totalIncome, budget: totalBudget, saving: totalSaving, spend: spendPerDay, update: updatedBudget
        });
        this.dataRecieved = true;
        this.counter++;
      })
      .catch (err => console.log('err from budget : ', err));
      }

  }

  budgetCheck() {
    return this.budgetInfo.update === '' ? this.budgetInfo.budget : this.budgetInfo.update;
  }

  totalSpended(data) {
    data = data.value;
    if (data.amount > this.budgetCheck()) {return false; };
    console.log('todaySpended: ', data);
    data.quantity && (data.quantity = data.quantity + ' ' + data.unit);
    this.dataRecieved = false;
    this.mainService.todaySpended(this.budgetRef, data.category, data.itemName, data.amount, data.quantity)
    .then(
      (res) => {
        console.log('today: ', res);
        this.myForm.reset();
        this.dataRecieved = true;
        this.message = 'Item successfully added';
        setTimeout(() => {
            this.message = '';
        }, 4000);
        this.updateBudget(data.amount);
      },
      (err) => {
        console.log('today: ', err);
        this.dataRecieved = true;
        this.message = err || 'Sorry! some problem occured while adding the item, please try again' ;
        setTimeout(() => {
            this.message = '';
        }, 4000);
      });
  }

  // update spend per day amount after adding info of item 
  updateBudget(todaySpended) {
    let { budget, update }: any = this.budgetInfo;
    let updatedBudget = update === '' ? (budget - todaySpended) : (update - todaySpended);
    this.mainService.updatedBudget(this.budgetRef, updatedBudget);
    this.getBudgetInfo();
  }

  logout() {
    this.mainService.logout();
  }

}

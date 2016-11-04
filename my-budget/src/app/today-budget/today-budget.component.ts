import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MainService } from '../shared/main.service';


function itemNameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && !control.value.match(/[A-Z | a-z]/g)) {
        return {invaliditemName: true};
    }
}

function amountValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && !control.value.match(/[0-9]/g)) {
        return {invalidAmount: true};
    }
}

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
  myForm: FormGroup;
  units: Array<string>;
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
    this.categories = ['Travel', 'Food', 'Medical', 'Other'];
    this.units = ['kg', 'dozen', 'item', 'other'];
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

  totalSpended(data) {
    this.dataRecieved = false;
    data = data.value;
    if (data.amount > this.budgetInfo.update) {return false; };
    console.log('todaySpended: ', data);
    data.quantity && (data.quantity = data.quantity + ' ' + data.unit);
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

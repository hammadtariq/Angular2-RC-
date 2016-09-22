import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';

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
  constructor(fb: FormBuilder, private route: ActivatedRoute, private mainService: MainService) {
      this.myForm = fb.group({
          'category' : ['', Validators.required],
          'itemName' : ['', Validators.compose([Validators.required, itemNameValidator])],
          'amount': ['', Validators.compose([Validators.required, amountValidator])],
      });

   }

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

  totalSpended(data) {
    data = data.value;
    console.log('todaySpended: ', data);
    this.mainService.todaySpended(this.budgetRef, data.category, data.itemName, data.amount)
    .then(
      (res) => {
        this.message = res;
        setTimeout(() => {
            this.message = '';
        }, 4000);
      },
      (res) => {
        this.myForm.reset();
        this.message = res;
        setTimeout(() => {
            this.message = '';
        }, 4000);
        this.updateBudget(data.amount);
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

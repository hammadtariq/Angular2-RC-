import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { itemNameValidator, amountValidator  } from '../shared/form.validators';
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
  oldIncome: any = '';
  btnLabel: string = 'Add';
  editFlag: boolean;
  myForm: FormGroup;
  constructor(fb: FormBuilder, private route: ActivatedRoute, private mainService: MainService) {
    this.myForm = fb.group({
          'income': ['', Validators.compose([Validators.required])],
          'saving': '',
      });
    // setValue: set values of all property
    // patchValue: change values of specific property
    this.myForm.patchValue({saving: 0});
  }

  ngOnInit() {
      let { params } = this.route.snapshot;
      params['username'] === 'edit' && (this.editFlag = true, this.getIncome());
      this.username = params['username'] !== 'edit' ?
      params['username'] : localStorage['username'];
      this.placeholderText = 'Your total income of ' + this.getCurrentMonth();
  }

  getIncome() {
    this.mainService.getIncome()
    .then((res) => {
      console.log('old income: ', res);
      this.oldIncome = res;
    }, (err) => {
      console.log(err);
    });
  }

  totalIncome(form) {
    console.log('total Income: ', form);
    form.saving === '' && (form.saving = 0);
    this.mainService.calculateBudget(this.username, form.income, form.saving);
  }

  editIncome(form) {
      form.saving === '' && (form.saving = 0);
      this.mainService.editIncome(this.username, form.income, form.saving, this.oldIncome);
  }

  cancelEdit() {
    this.mainService.cancelEdit();
  }

  getCurrentMonth() {
    const date = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[date.getMonth()];
  }

}

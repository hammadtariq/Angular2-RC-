import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyAZB2a7SEmbQQd4r236nQNrRtiBnuhF5hk',
  authDomain: 'todo-list-8f989.firebaseapp.com',
  databaseURL: 'https://todo-list-8f989.firebaseio.com',
  storageBucket: 'todo-list-8f989.appspot.com'
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

@Injectable()
export class MainService {
  budgetHistory: any;

  constructor(private router: Router) {}

  getStarted(username) {
      let vm = this;
      database.ref('users/' + username).once('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            let budgetRef = 'budgetHistory/' + username + '' + this.currentYear + '/' + this.currentMonth;
            let budgetRefYearly = 'budgetHistory/' + username + '' + this.currentYear;
            window.localStorage['username'] = username;
            window.localStorage['budgetRef'] = budgetRef;
            window.localStorage['budgetRefYearly'] = budgetRefYearly;
            vm.router.navigate(['/today-budget', budgetRef]);
          }else {
            database.ref('users/' + username).set({
              username: username,
            });
            window.localStorage['username'] = username;
            vm.router.navigate(['/add-budget', username]);
          }
    });
  }

  calculateBudget(username, income, saving) {
    let userBudgetRef = 'budgetHistory/' + username + '' + this.currentYear + '/' + this.currentMonth;
    let budget = income - saving;
    const spendPerDay = Math.floor(budget / this.leftDays());
    database.ref(userBudgetRef).update({
      totalIncome: income,
      totalSaving: saving,
      totalBudget: budget,
      spendPerDay: spendPerDay,
      updatedBudget: ''
    });
    window.localStorage['budgetRef'] = userBudgetRef;
    let budgetRefYearly = 'budgetHistory/' + username + '' + this.currentYear;
    window.localStorage['budgetRefYearly'] = budgetRefYearly;
    this.router.navigate(['/today-budget', userBudgetRef]);
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  moneyToSpend(budgetRef) {
    return database.ref(budgetRef).once('value');
  }

  todaySpended(budgetRef, category, item, todaySpended, quantity) {
    let date = new Date();
    return database.ref(budgetRef + '/Days/' + date).set({
      category: category, item: item, quantity: quantity, money: todaySpended});
  }

  updatedBudget(budgetRef, updatedBudget) {
    const spendPerDay = Math.floor(updatedBudget / this.leftDays());
    console.log('spend per days: ', spendPerDay);
    database.ref(budgetRef).update({
      updatedBudget: updatedBudget,
      spendPerDay: spendPerDay
    });
  }

  editIncome(username, newIncome, newSaving, oldIncome) {
    if (newIncome === oldIncome.totalIncome && newSaving === oldIncome.totalSaving) {
       this.router.navigate(['/today-budget', this.budgetRef]);
       return false;
    }
    let newBudget = newIncome - newSaving;
    const updatedBudget = oldIncome.updatedbudget ?
      oldIncome.updatedbudget + Math.abs(newBudget - oldIncome.totalBudget)
      : Math.abs(newBudget - oldIncome.totalBudget);
    if (updatedBudget) {
      const spendPerDay = Math.floor(updatedBudget / this.leftDays());
      database.ref(this.budgetRef).update({
        totalIncome: newIncome,
        totalSaving: newSaving,
        spendPerDay: spendPerDay,
        totalBudget: newBudget,
        updatedBudget: updatedBudget
      });
    }else {
      database.ref(this.budgetRef).update({
        totalIncome: newIncome,
        totalSaving: newSaving,
        spendPerDay: oldIncome.spendPerDay,
        totalBudget: newBudget,
        updatedBudget: oldIncome.updatedBudget
      });
    }
    this.router.navigate(['/today-budget', this.budgetRef]);
  }

  cancelEdit() {
    this.router.navigate(['/today-budget', this.budgetRef]);
  }

  getIncome() {
    return new Promise((resolve, reject) => {
        database.ref(this.budgetRef).once('value', function(snapshot) {
          console.log('Income obj: ', snapshot.val());
          snapshot.val() ? resolve(snapshot.val()) : reject('error in getting Income');
        });
    });
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/']);
  }

  leftDays() {
    const date = new Date();
    const totalDays = this.daysInMonth(date.getMonth() + 1, date.getFullYear());
    return (totalDays - (date.getDate() + 1));
  }

  getHistory() {
      return database.ref(this.budgetRefYearly).once('value');
  }

  isLoggedIn() {
        if (this.budgetRef) {
          database.ref(this.budgetRefYearly + '/' + this.currentMonth).once('value', (snapshot) => {
            snapshot.val() ? this.router.navigate(['/today-budget', this.budgetRef]) :
            this.router.navigate(['/add-budget', this.username]);
          });
          return false;
        }else {
          return true;
        }
    }

    get budgetRef() {
      return window.localStorage['budgetRef'];
    }

    get budgetRefYearly() {
      return window.localStorage['budgetRefYearly'];
    }

    get username(){
      return window.localStorage['username'];
    }

    get currentMonth(){
      const date = new Date();
      return monthNames[date.getMonth()];
    }

    get currentYear(){
      const date = new Date();
      return date.getFullYear();
    }
}

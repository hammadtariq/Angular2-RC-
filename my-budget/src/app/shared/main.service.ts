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
  // apiKey: "AIzaSyDVsgU-VA6Jyqqk1krgejl-RUdVwqgNj1c",
  //   authDomain: "budget-25304.firebaseapp.com",
  //   databaseURL: "https://budget-25304.firebaseio.com",
  //   storageBucket: "budget-25304.appspot.com",
  //   messagingSenderId: "733600158677"
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
      database.ref('users/' + username).once('value', function(snapshot) {
          const data = snapshot.val();
          if (data) {
            const date = new Date();
            let currentMonth = monthNames[date.getMonth()];
            let currentYear = date.getFullYear();
            let budgetRef = 'budgetHistory/' + username + '' + currentYear + '/' + currentMonth;
            window.localStorage['username'] = username;
            window.localStorage['budgetRef'] = budgetRef;
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

  calculateBudget(username, budget, updatedBudget?, editFlag? ) {
    const date = new Date();
    let currentMonth = monthNames[date.getMonth()];
    let currentYear = date.getFullYear();
    let userBudgetRef = 'budgetHistory/' + username + '' + currentYear + '/' + currentMonth;
    if (!editFlag) {
        const spendPerDay = Math.floor(budget / this.leftDays());
        database.ref(userBudgetRef).update({
          totalBudget: budget,
          spendPerDay: spendPerDay,
          updatedBudget: ''
        });
    }else {
        const spendPerDay = Math.floor(updatedBudget / this.leftDays());
        database.ref(userBudgetRef).update({
            totalBudget: budget,
            spendPerDay: spendPerDay,
            updatedBudget: updatedBudget
          });
    }
    window.localStorage['budgetRef'] = userBudgetRef;
    this.router.navigate(['/today-budget', userBudgetRef]);
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  moneyToSpend(budgetRef) {
    return database.ref(budgetRef).once('value');
  }

  todaySpended(budgetRef, category, item, todaySpended) {
    return new Promise((resolve, reject) => {
        let date = new Date();
        database.ref(budgetRef + '/Days/' + date).once('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
              resolve('Todays spended amount already added');
            }else {
              database.ref(budgetRef + '/Days/' + date).set({
                category: category, item: item, money: todaySpended});
              reject('Todays spended amount successfully added');
            }
        });
    });

  }

  updateBudget(budgetRef, updatedBudget) {
    const spendPerDay = Math.floor(updatedBudget / this.leftDays());
    console.log('spend per days: ', spendPerDay);
    database.ref(budgetRef).update({
      updatedBudget: updatedBudget,
      spendPerDay: spendPerDay
    });
  }

  isLoggedIn() {
      if (this.budgetRef) {
        this.router.navigate(['/today-budget', this.budgetRef]);
        return false;
      }else {
        return true;
      }
  }

  getHistory() {
    return new Promise((resolve, reject) => {
        database.ref(this.budgetRef + '/Days').once('value', (snapshot) => {
          console.log('history: ', snapshot.val());
          snapshot.val() ? resolve(snapshot.val()) : reject('No history available yet.');
        });
    });

  }

  editBudget(username, newBudget, oldBudget) {
    database.ref(this.budgetRef).update({
      totalBudget: newBudget
    });
    const updatedBudget = oldBudget.updatedBudget + Math.abs(newBudget - oldBudget.totalBudget);
    this.calculateBudget(username, newBudget, updatedBudget, true);
  }

  get budgetRef() {
    return window.localStorage['budgetRef'];
  }

  cancelEdit() {
    this.router.navigate(['/today-budget', this.budgetRef]);
  }

  getBudget() {
    return new Promise((resolve, reject) => {
        database.ref(this.budgetRef).once('value', function(snapshot) {
          console.log('budget obj: ', snapshot.val());
          snapshot.val() ? resolve(snapshot.val()) : reject('error in getting budget');
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

}

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { TodayBudgetComponent } from './today-budget/today-budget.component';
import { BudgetHistoryComponent } from './budget-history/budget-history.component';
import { CanActivateViaAuthGuard } from './shared/auth-guard.service';

const appRoutes: Routes = [
   { path: 'add-budget/:username', component: AddBudgetComponent },
   { path: 'today-budget/:budgetRef', component: TodayBudgetComponent },
   { path: 'budget-history', component: BudgetHistoryComponent },
   { path: '', component: LandingPageComponent, canActivate: [CanActivateViaAuthGuard], },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

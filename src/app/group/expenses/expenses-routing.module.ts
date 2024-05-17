import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpensesPage} from "./expenses.page";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExpensesPage,
  },
  {
    path: ':expenseId',
    loadChildren: () => import('./pages/expense-details/expense-details.module').then( m => m.ExpenseDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupComponent } from './group.component';
import {ExpensesPage} from "./expenses/expenses.page";
import {BalancePage} from "./balance/balance.page";
import {ParticipantsPage} from "./participants/participants.page";

const routes: Routes = [
  {
    path: '',
    component: GroupComponent
  },
  {
    path: ':groupId',
    component: GroupComponent,
    children: [
      {
        path: 'expenses',
        loadChildren: () => import('./expenses/expenses.module').then( m => m.ExpensesModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'expenses'
      },
      {
        path: 'balance',
        component: BalancePage,
      },
      {
        path: 'participants',
        component: ParticipantsPage,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {}

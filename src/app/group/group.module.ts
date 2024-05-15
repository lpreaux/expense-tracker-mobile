import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupComponent } from './group.component';
import {ExpensesPage} from "./expenses/expenses.page";
import {BalancePage} from "./balance/balance.page";
import {ParticipantsPage} from "./participants/participants.page";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    GroupComponent,
    ExpensesPage,
    BalancePage,
    ParticipantsPage,
  ]
})
export class GroupPageModule {}

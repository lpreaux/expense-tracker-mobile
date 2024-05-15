import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import {ExpensesPage} from "./expenses.page";
import {IonicModule} from "@ionic/angular";
import {ExpensesListItemComponent} from "./components/expenses-list-item/expenses-list-item.component";
import {NewEwpenseFormModalComponent} from "./components/new-ewpense-form-modal/new-ewpense-form-modal.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ExpensesPage,
    ExpensesListItemComponent,
    NewEwpenseFormModalComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class ExpensesModule { }

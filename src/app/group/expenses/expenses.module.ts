import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import {ExpensesPage} from "./expenses.page";
import {IonicModule} from "@ionic/angular";
import {ExpensesListItemComponent} from "./components/expenses-list-item/expenses-list-item.component";
import {NewExpenseFormModalComponent} from "./components/new-expense-form-modal/new-expense-form-modal.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ExpensesPage,
    ExpensesListItemComponent,
    NewExpenseFormModalComponent,
  ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        IonicModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ]
})
export class ExpensesModule { }

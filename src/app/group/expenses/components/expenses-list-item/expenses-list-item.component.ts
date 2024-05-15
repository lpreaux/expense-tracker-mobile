import {Component, Input, OnInit} from '@angular/core';
import {Expense} from "../../../../providers/expense.service";

@Component({
  selector: 'app-expenses-list-item',
  templateUrl: './expenses-list-item.component.html',
  styleUrls: ['./expenses-list-item.component.scss'],
})
export class ExpensesListItemComponent {
  @Input({required: true}) expense!: Expense;
}

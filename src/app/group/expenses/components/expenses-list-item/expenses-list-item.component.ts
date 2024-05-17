import {Component, input} from '@angular/core';
import {Expense} from "../../../../providers/expense.service";
import {ParticipantService} from "../../../../providers/participant.service";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {filter, mergeMap} from "rxjs";

@Component({
  selector: 'app-expenses-list-item',
  templateUrl: './expenses-list-item.component.html',
  styleUrls: ['./expenses-list-item.component.scss'],
})
export class ExpensesListItemComponent {
  expense = input<Expense>();

  protected participant = toSignal(toObservable(this.expense).pipe(
    filter(expense => expense != undefined),
    mergeMap(expense => this.particpantService.getById(expense!.participantId))
  ));

  constructor(
    private particpantService: ParticipantService,
  ) {
  }
}

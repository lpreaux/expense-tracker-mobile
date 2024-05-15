import {Component, computed, effect, OnInit, signal, ViewChild} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";
import {IonModal, ModalController} from "@ionic/angular";
import {NewEwpenseFormModalComponent} from "./components/new-ewpense-form-modal/new-ewpense-form-modal.component";
import {Expense, ExpenseService} from "../../providers/expense.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage {
  @ViewChild(IonModal) modal!: IonModal;

  protected group = this.groupTrackerService.currentGroup;
  protected expenses = signal<Expense[] | undefined>(undefined);
  protected totalExpenses = computed(() => {
    return this.expenses()?.reduce(
      (acc, expense) => acc += expense.amount,
      0
    );
  })
  private expenseRetrieve = effect(() => {
    this.group();
    this.refreshExpenses()
  });

  constructor(
    private groupTrackerService: GroupTrackerService,
    private expenseService: ExpenseService,
    private modalController: ModalController
  ) {
  }

  private refreshExpenses() {
    const group = this.group();
    if (group) {
      this.expenseService.getAllByGroupId(group.id)
        .subscribe(expenses => this.expenses.set(expenses));
    }
  }

  async openNewExpenseModal() {
    const modal = await this.modalController.create({
      component: NewEwpenseFormModalComponent,
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss<Omit<Expense, "id">>();

    if (role === 'confirm') {
      data!.groupId = this.group()!.id
      this.expenseService.createOne(data!)
        .subscribe(() => this.refreshExpenses());
    }
  }
}

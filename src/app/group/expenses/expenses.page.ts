import {Component, computed, effect, signal, ViewChild} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";
import {IonModal, ModalController} from "@ionic/angular";
import {NewExpenseFormModalComponent} from "./components/new-expense-form-modal/new-expense-form-modal.component";
import {Expense, ExpenseService} from "../../providers/expense.service";

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
      (acc, expense) => acc + expense.amount,
      0
    );
  })

  constructor(
    private groupTrackerService: GroupTrackerService,
    private expenseService: ExpenseService,
    private modalCtrl: ModalController,
  ) {
    effect(() => {
      this.group();
      this.refreshExpenses()
    });
  }

  private refreshExpenses() {
    const group = this.group();
    if (group) {
      this.expenseService.getAllByGroupId(group.id)
        .subscribe(expenses => this.expenses.set(expenses));
    }
  }

  async openNewExpenseModal() {
    const modal = await this.modalCtrl.create({
      component: NewExpenseFormModalComponent,
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss<Omit<Expense, "id">>();

    if (role === 'confirm') {
      data!.groupId = this.group()!.id
      this.expenseService.createOne(data!)
        .subscribe(() => this.refreshExpenses());
    }
  }

  showGroupActionsSheet() {
    this.groupTrackerService.showGroupActionsSheet();
  }

}

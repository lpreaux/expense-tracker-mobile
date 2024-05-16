import {Component, computed, effect, signal, ViewChild} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";
import {ActionSheetController, IonModal, ModalController} from "@ionic/angular";
import {NewExpenseFormModalComponent} from "./components/new-expense-form-modal/new-expense-form-modal.component";
import {Expense, ExpenseService} from "../../providers/expense.service";
import {Router} from "@angular/router";
import {GroupService} from "../../providers/group.service";

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
    private actionSheetCtrl: ActionSheetController,
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

  async showGroupActionsSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
        header: 'Groupe',
        buttons: [
          {
            text: 'Supprimer',
            role: 'destructive',
            handler: () => this.groupTrackerService.deleteCurrentGroup(),
          },
          {
            text: 'Modifier',
            role: 'update',
            handler: () => this.groupTrackerService.showUpdateGroupModal(),
          },
          {
            text: 'Annuler',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ],
      }
    );

    actionSheet.present();
  }
}

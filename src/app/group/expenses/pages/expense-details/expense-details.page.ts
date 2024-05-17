import {Component, effect, input, signal} from '@angular/core';
import {Expense, ExpenseService} from "../../../../providers/expense.service";
import {Participant, ParticipantService} from "../../../../providers/participant.service";
import {ActionSheetController, ModalController, NavController} from "@ionic/angular";
import {
  UpdateExpenseFormModalComponent
} from "../../components/update-expense-form-modal/update-expense-form-modal.component";

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage {
  expenseId = input(0, {transform: (v: string) => parseInt(v)});
  protected expense = signal<Expense | undefined>(undefined);
  protected participant = signal<Participant | undefined>(undefined);

  constructor(
    private expenseService: ExpenseService,
    private participantService: ParticipantService,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
  ) {
    effect(() => {
      this.expenseId();
      this.refreshExpense();
    });
    effect(() => {
      const expense = this.expense();
      if (expense) {
        this.participantService.getById(expense.participantId)
          .subscribe(participant => this.participant.set(participant));
      }
    });
  }

  getLocation(expense: Expense) {
    // Solution rapide parce que l'inférence de type ne marche pas dans le template HTML avec un switch
    // TODO trouver une meilleur solution
    switch (expense.locationType) {
      case "currentLocation":
        return `Long: ${expense.location.coords.longitude} - Lat: ${expense.location.coords.latitude}`;
      case "other":
        return `${expense.location}`
    }

  }

  async showExpenseActionsSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
        header: 'Expense',
        buttons: [
          {
            text: 'Supprimer',
            role: 'destructive',
            handler: () => {
              this.expenseService.deleteOneById(this.expenseId())
                .subscribe(() => this.navCtrl.back())
            },
          },
          {
            text: 'Modifier',
            role: 'update',
            handler: () => this.showUpdateExpenseModal(),
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

  async showUpdateExpenseModal() {
    const modal = await this.modalCtrl.create({
      component: UpdateExpenseFormModalComponent,
      componentProps: {
        expense: this.expense(),
      }
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss<Participant>();

    if (role === 'confirm') {
      this.participantService.put(data!)
        .subscribe(() => this.refreshExpense());
    }
  }

  private refreshExpense() {
    const expenseId = this.expenseId();
    if (expenseId) {
      this.expenseService.getById(expenseId)
        .subscribe(expense => this.expense.set(expense));
    }
  }
}

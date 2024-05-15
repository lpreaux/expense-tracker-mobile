import {Component, OnInit, ViewChild} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";
import {IonModal, ModalController} from "@ionic/angular";
import {NewEwpenseFormModalComponent} from "./components/new-ewpense-form-modal/new-ewpense-form-modal.component";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage {
  @ViewChild(IonModal) modal!: IonModal;

  protected group = this.groupTrackerService.currentGroup;

  constructor(
    private groupTrackerService: GroupTrackerService,
    private modalController: ModalController
  ) {
  }

  async openNewExpenseModal() {
    const modal = await this.modalController.create({
      component: NewEwpenseFormModalComponent,
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      // TODO
      console.log(data);
    }
  }
}

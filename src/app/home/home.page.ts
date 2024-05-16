import {Component, signal} from '@angular/core';
import {Group, GroupService} from "../providers/group.service";
import {ModalController, ViewWillEnter} from "@ionic/angular";
import {NewGroupFormModalComponent} from "./components/new-group-form-modal/new-group-form-modal.component";
import {first} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  protected groups = signal<Group[] | undefined>(undefined);
  protected lastGroupUse = this.groupService.lastGroupUse;

  constructor(
    private groupService: GroupService,
    private modalCtrl: ModalController
  ) {
  }

  ionViewWillEnter() {
    this.refreshGroups();
  }

  async openNewGroupModal() {
    const modal = await this.modalCtrl.create({
      component: NewGroupFormModalComponent,
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss<Omit<Group, "id">>();

    if (role === 'confirm') {
      this.groupService.createOne(data!)
        .subscribe(() => this.refreshGroups());
    }
  }

  private refreshGroups() {
    this.groupService.getAll()
      .pipe(first())
      .subscribe(groups => this.groups.set(groups))
  }
}

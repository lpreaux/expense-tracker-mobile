import {Injectable, signal} from '@angular/core';
import {Group, GroupService} from "../providers/group.service";
import {Router} from "@angular/router";
import {ExpenseService} from "../providers/expense.service";
import {ParticipantService} from "../providers/participant.service";
import {ModalController} from "@ionic/angular";
import {UpdateGroupFormModalComponent} from "./components/update-group-form-modal/update-group-form-modal.component";

@Injectable({
  providedIn: 'root'
})
export class GroupTrackerService {
  private _currentGroup = signal<Group | undefined>(undefined)
  get currentGroup() {
    return this._currentGroup.asReadonly();
  }

  constructor(
    private groupService: GroupService,
    private expenseService: ExpenseService,
    private participantService: ParticipantService,
    private modalCtrl: ModalController,
    private router: Router,
  ) {
  }

  setCurrentGroup(groupId: number) {
    this.groupService.getById(groupId)
      .subscribe({
        next: group => {
          this._currentGroup.set(group);
          this.groupService.setLastGroupUse(group);
        },
        error: () => this.router.navigate(['/'])
      });
  }

  deleteCurrentGroup() {
    const group = this._currentGroup();
    this._currentGroup.set(undefined);

    if (group) {
      this.expenseService.getAllKeysByGroup(group).subscribe(keys => keys.forEach(key => this.expenseService.deleteOneById(key).subscribe()));
      this.participantService.getAllKeysByGroup(group).subscribe(keys => keys.forEach(key => this.participantService.deleteOneById(key).subscribe()));
      this.groupService.deleteOne(group).subscribe(() => this.router.navigate(['/']));
    }
  }

  async showUpdateGroupModal() {
    const modal = await this.modalCtrl.create({
      component: UpdateGroupFormModalComponent,
      componentProps: {
        group: this._currentGroup()
      }
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss<Group>();

    if (role === 'confirm') {
      this.groupService.updateOne(data!).subscribe()
    }
  }
}

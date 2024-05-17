import {Component, effect, signal} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";
import {Participant, ParticipantService} from "../../providers/participant.service";
import {ActionSheetController, ModalController, RefresherCustomEvent} from "@ionic/angular";
import {
  NewParticipantFormModalComponent
} from "./components/new-participant-form-modal/new-participant-form-modal.component";
import {
  UpdateParticipantFormModalComponent
} from "./components/update-participant-form-modal/update-participant-form-modal.component";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage {
  protected group = this.groupTrackerService.currentGroup;
  protected participants = signal<Participant[] | undefined>(undefined);

  constructor(
    private groupTrackerService: GroupTrackerService,
    private participantService: ParticipantService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
  ) {
    effect(() => {
      this.group();
      this.refreshParticipants()
    });
  }

  protected refreshParticipants($event?: RefresherCustomEvent) {
    const group = this.group();
    if (group) {
      this.participantService.getAllByGroup(group)
        .subscribe({
          next: participants => this.participants.set(participants),
          complete: () => {
            if ($event) {
              $event.target.complete();
            }
          }
        });
    }
  }

  async openNewParticipantModal() {
    const modal = await this.modalCtrl.create({
      component: NewParticipantFormModalComponent
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss<Omit<Participant, "id">>();

    if (role === 'confirm') {
      const participant = Object.assign(data!, {
        groupId: this.group()!.id,
      })
      this.participantService.put(participant)
        .subscribe(() => this.refreshParticipants());
    }
  }

  async showParticipantActionsSheet(participant: Participant) {
    const actionSheet = await this.actionSheetCtrl.create({
        header: 'Participant',
        buttons: [
          {
            text: 'Supprimer',
            role: 'destructive',
            handler: () => {
              this.participantService.deleteOneById(participant.id)
                .subscribe(() => this.refreshParticipants())
            },
          },
          {
            text: 'Modifier',
            role: 'update',
            handler: () => this.showUpdateParticipantModal(participant),
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

  async showUpdateParticipantModal(participant: Participant) {
    const modal = await this.modalCtrl.create({
      component: UpdateParticipantFormModalComponent,
      componentProps: {
        participant: participant,
      }
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss<Participant>();

    if (role === 'confirm') {
      this.participantService.put(data!)
        .subscribe(() => this.refreshParticipants());
    }
  }

  showGroupActionsSheet() {
    this.groupTrackerService.showGroupActionsSheet();
  }
}

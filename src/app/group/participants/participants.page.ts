import {Component, effect, signal} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";
import {Participant, ParticipantService} from "../../providers/participant.service";
import {RefresherCustomEvent} from "@ionic/angular";

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
    private participantService: ParticipantService
  ) {
    effect(() => {
      this.group();
      this.refreshParticipant()
    });
  }

  protected refreshParticipant($event?: RefresherCustomEvent) {
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
}

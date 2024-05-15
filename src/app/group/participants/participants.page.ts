import { Component, OnInit } from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {
  protected group = this.groupTrackerService.currentGroup;

  constructor(
    private groupTrackerService: GroupTrackerService
  ) {}

  ngOnInit() {}
}

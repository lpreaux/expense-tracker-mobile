import {Component, OnInit} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  protected group = this.groupTrackerService.currentGroup;

  constructor(
    private groupTrackerService: GroupTrackerService
  ) {}

  ngOnInit() {}
}

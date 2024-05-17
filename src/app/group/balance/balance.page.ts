import {Component} from '@angular/core';
import {GroupTrackerService} from "../group-tracker.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage {
  protected group = this.groupTrackerService.currentGroup;

  constructor(
    private groupTrackerService: GroupTrackerService
  ) {
  }

  showGroupActionsSheet() {
    this.groupTrackerService.showGroupActionsSheet();
  }
}

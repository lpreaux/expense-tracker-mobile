import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {GroupTrackerService} from "./group-tracker.service";
import {ExpenseService} from "../providers/expense.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  // Group ID get by path variable
  @Input({transform: numberAttribute}) groupId!: number;

  constructor(
    private groupTrackerService: GroupTrackerService,
  ) { }

  ngOnInit() {
    this.groupTrackerService.setCurrentGroup(this.groupId);
  }

}

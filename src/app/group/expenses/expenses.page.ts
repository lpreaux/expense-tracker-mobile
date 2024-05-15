import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {Group, GroupService} from "../../providers/group.service";
import {Router} from "@angular/router";
import {GroupTrackerService} from "../group-tracker.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  protected group = this.groupTrackerService.currentGroup;

  constructor(
    private groupTrackerService: GroupTrackerService
  ) {}

  ngOnInit() {}
}

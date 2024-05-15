import {Component, OnInit, Signal} from '@angular/core';
import {Group, GroupService} from "../providers/group.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  protected groups: Group[] = [];
  protected lastGroupUse = this.groupService.lastGroupUse;

  constructor(
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.groups = this.groupService.getAll();
  }
}

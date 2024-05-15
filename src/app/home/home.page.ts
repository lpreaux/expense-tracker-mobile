import {Component, OnInit} from '@angular/core';
import {Group, GroupService} from "../providers/group.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected groups = toSignal(this.groupService.getAll());
  protected lastGroupUse = this.groupService.lastGroupUse;

  constructor(
    private groupService: GroupService
  ) {}
}

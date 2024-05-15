import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {Group, GroupService} from "../providers/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  // Group ID get by path variable
  @Input({transform: numberAttribute}) groupId!: number;

  protected group!: Group;

  constructor(
    private groupService: GroupService,
    private router: Router,
  ) { }

  ngOnInit() {
    const group = this.groupService.getById(this.groupId);
    if (group === -1) {
      this.router.navigate(['/']);
      return;
    }
    this.group = group;
    this.groupService.setLastGroupUse(this.group);
  }

}

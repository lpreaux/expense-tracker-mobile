import {Injectable, signal} from '@angular/core';
import {Group, GroupService} from "../providers/group.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GroupTrackerService {
  private _currentGroup = signal<Group | undefined>(undefined)
  get currentGroup() {
    return this._currentGroup.asReadonly();
  }

  constructor(
    private groupService: GroupService,
    private router: Router,
  ) {
  }

  setCurrentGroup(groupId: number) {
    this.groupService.getById(groupId)
      .subscribe({
        next: group => {
          this._currentGroup.set(group);
          this.groupService.setLastGroupUse(group);
        },
        error: () => this.router.navigate(['/'])
      });
  }
}

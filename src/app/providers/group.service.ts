import {Injectable, signal, Signal} from '@angular/core';
import {LocalStorageService} from "../services/local-storage.service";
import {IndexedDbService, StoreCreationObject} from "../db/indexed-db.service";

export interface Group {
  id: number;
  name: string;
}

export const groupStoreDefinition: StoreCreationObject = {
  name: "Group",
  options: {
    keyPath: "id",
    autoIncrement: true,
  },
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private _lastGroupUse = signal<Group | undefined>(undefined);
  private readonly _LAST_GROUP_USE_LS_KEY = "GroupService.lastGroupUse";

  get lastGroupUse(): Signal<Group | undefined> {
    return this._lastGroupUse.asReadonly();
  }

  constructor(
    private localStorageService: LocalStorageService,
    private indexedDb: IndexedDbService
  ) {
    this.init();
  }

  private init() {
    const groupIdStr = this.localStorageService.getItem(this._LAST_GROUP_USE_LS_KEY);
    if (groupIdStr) {
      this.getById(Number.parseInt(groupIdStr))
        .subscribe(group => this._lastGroupUse.set(group));
    }
  }

  getAll() {
    return this.indexedDb.getAll<Group>(groupStoreDefinition.name);
  }

  getById(groupId: number) {
    return this.indexedDb.get<Group>(groupStoreDefinition.name, groupId)
  }

  setLastGroupUse(value: Group) {
    this._lastGroupUse.set(value);
    this.localStorageService.setItem(this._LAST_GROUP_USE_LS_KEY, String(value.id))
  }

  createOne(group: Omit<Group, "id">) {
    return this.indexedDb.put<Group>(
      groupStoreDefinition.name,
      undefined,
      group
    )
  }

  deleteOne(group: Group) {
    if (this.lastGroupUse() === group) {
      this._lastGroupUse.set(undefined);
    }
    return this.indexedDb.delete(groupStoreDefinition.name, group.id);
  }

  updateOne(group: Group) {
    return this.indexedDb.put<Group>(groupStoreDefinition.name, undefined, group);
  }
}

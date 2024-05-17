import { Injectable } from '@angular/core';
import {IndexedDbService, StoreCreationObject} from "../db/indexed-db.service";
import {Group} from "./group.service";

export interface Participant {
  id: number;
  groupId: number;
  lastname: string;
  firstname: string;
}

export const participantStoreDefinition: StoreCreationObject = {
  name: "Participant",
  options: {
    keyPath: "id",
    autoIncrement: true,
  },
  indexes: [{name: "groupId", keyPath: "groupId", options: {unique: false}}],
};

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(
    private indexedDb: IndexedDbService
  ) { }

  getAllByGroup(group: Group) {
    return this.indexedDb.getAllByIndex<Participant>(participantStoreDefinition.name, 'groupId', group.id);
  }

  deleteOneById(id: number) {
    return this.indexedDb.delete(participantStoreDefinition.name, id);
  }

  getAllKeysByGroup(group: Group) {
    return this.indexedDb.getAllKeysByIndex<number>(participantStoreDefinition.name, 'groupId', group.id);
  }

  put(particiapnt: Omit<Participant, "id">) {
    return this.indexedDb.put<Participant>(participantStoreDefinition.name, undefined, particiapnt);
  }
}

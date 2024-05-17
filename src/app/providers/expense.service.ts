import {Injectable} from '@angular/core';
import {IndexedDbService, StoreCreationObject} from "../db/indexed-db.service";
import {Group} from "./group.service";
import {Position} from "@capacitor/geolocation";

type CurrentPositionLocation = {
  locationType: 'currentLocation';
  location: Position;
}

type OtherLocation = {
  locationType: 'other';
  location: string;
}

type Location = CurrentPositionLocation | OtherLocation

export type Expense = {
  id: number;
  groupId: number;
  amount: number;
  label: string;
  participantId: number;
  proofImgUrl?: string;
} & Location

export const expenseStoreDefinition: StoreCreationObject = {
  name: "Expense",
  options: {
    keyPath: "id",
    autoIncrement: true,
  },
  indexes: [{name: "groupId", keyPath: "groupId", options: {unique: false}}],
};


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private indexedDb: IndexedDbService
  ) {
  }

  getAllByGroupId(groupId: number) {
    return this.indexedDb.getAllByIndex<Expense>(expenseStoreDefinition.name, 'groupId', IDBKeyRange.only(groupId));
  }

  createOne(expense: Omit<Expense, "id">) {
    return this.indexedDb.put(
      expenseStoreDefinition.name,
      undefined,
      expense
    );
  }

  deleteOneById(id: number) {
    return this.indexedDb.delete(expenseStoreDefinition.name, id);
  }

  getAllKeysByGroup(group: Group) {
    return this.indexedDb.getAllKeysByIndex<number>(expenseStoreDefinition.name, 'groupId', group.id);
  }

  getById(expenseId: number) {
    return this.indexedDb.get<Expense>(expenseStoreDefinition.name, expenseId);
  }
}

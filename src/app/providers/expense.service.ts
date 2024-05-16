import {Injectable} from '@angular/core';
import {IndexedDbService, StoreCreationObject} from "../db/indexed-db.service";

export interface Expense {
  id: number;
  groupId: number;
  amount: number;
  label: string;
  participantId: number;
  proofImgUrl?: string;
}

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
    return this.indexedDb.put<Expense>(
      expenseStoreDefinition.name,
      undefined,
      expense
    );
  }
}

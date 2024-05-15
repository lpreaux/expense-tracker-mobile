import {Injectable, signal, Signal} from '@angular/core';
import {Expense} from "./expense.service";
import {LocalStorageService} from "../services/local-storage.service";

export interface Group {
  id: number;
  name: string;
  expenses: Expense[];
}

const mockGroups: Group[] = [
  {
    id: 1,
    name: "Vacation Planning",
    expenses: [
      { id: 1, amount: 150.00, label: "Airfare" },
      { id: 2, amount: 200.00, label: "Hotel" },
      { id: 3, amount: 50.00, label: "Car Rental" }
    ]
  },
  {
    id: 2,
    name: "Office Supplies",
    expenses: [
      { id: 4, amount: 30.00, label: "Pens" },
      { id: 5, amount: 120.00, label: "Paper" },
      { id: 6, amount: 200.00, label: "Printers" }
    ]
  },
  {
    id: 3,
    name: "Birthday Party",
    expenses: [
      { id: 7, amount: 100.00, label: "Cake" },
      { id: 8, amount: 150.00, label: "Decorations" },
      { id: 9, amount: 300.00, label: "Venue" }
    ]
  },
  {
    id: 4,
    name: "Wedding Fund",
    expenses: [
      { id: 10, amount: 500.00, label: "Catering" },
      { id: 11, amount: 800.00, label: "Band" },
      { id: 12, amount: 1500.00, label: "Photographer" }
    ]
  },
  {
    id: 5,
    name: "Monthly Bills",
    expenses: [
      { id: 13, amount: 120.00, label: "Electricity" },
      { id: 14, amount: 30.00, label: "Water" },
      { id: 15, amount: 50.00, label: "Internet" }
    ]
  },
  {
    id: 6,
    name: "Road Trip",
    expenses: [
      { id: 16, amount: 200.00, label: "Gas" },
      { id: 17, amount: 150.00, label: "Accommodations" },
      { id: 18, amount: 100.00, label: "Food" }
    ]
  },
  {
    id: 7,
    name: "Home Renovation",
    expenses: [
      { id: 19, amount: 2000.00, label: "Materials" },
      { id: 20, amount: 3000.00, label: "Labor" },
      { id: 21, amount: 500.00, label: "Paint" }
    ]
  },
  {
    id: 8,
    name: "Sports Club",
    expenses: [
      { id: 22, amount: 75.00, label: "Membership Fee" },
      { id: 23, amount: 50.00, label: "Equipment" },
      { id: 24, amount: 20.00, label: "Refreshments" }
    ]
  },
  {
    id: 9,
    name: "Tech Gadgets",
    expenses: [
      { id: 25, amount: 999.00, label: "Smartphone" },
      { id: 26, amount: 399.00, label: "Smartwatch" },
      { id: 27, amount: 199.00, label: "Headphones" }
    ]
  },
  {
    id: 10,
    name: "Book Club",
    expenses: [
      { id: 28, amount: 15.00, label: "New Releases" },
      { id: 29, amount: 25.00, label: "Classics" },
      { id: 30, amount: 30.00, label: "Biographies" }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private _lastGroupUse = signal<Group|undefined>(undefined);
  private readonly _LAST_GROUP_USE_LS_KEY = "GroupService.lastGroupUse";
  get lastGroupUse(): Signal<Group|undefined> {
    return this._lastGroupUse.asReadonly();
  }

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.init();
  }

  private init() {
    const groupIdStr = this.localStorageService.getItem(this._LAST_GROUP_USE_LS_KEY);
    if (groupIdStr) {
      const group = this.getById(Number.parseInt(groupIdStr));
      this._lastGroupUse.set(group !== -1 ? group : undefined);
    }
  }

  getAll() {
    return mockGroups;
  }

  getById(groupId: number) {
    let filteredGroups = this.getAll().filter(group => group.id === groupId);
    if (filteredGroups.length !== 1) {
      return -1;
    }
    return filteredGroups[0];
  }

  setLastGroupUse(value: Group) {
    this._lastGroupUse.set(value);
    this.localStorageService.setItem(this._LAST_GROUP_USE_LS_KEY, String(value.id))
  }
}

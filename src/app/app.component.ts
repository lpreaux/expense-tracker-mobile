import {Component, OnInit} from '@angular/core';
import {Group, groupStoreDefinition} from "./providers/group.service";
import {IndexedDbService} from "./db/indexed-db.service";
import {Expense, expenseStoreDefinition} from "./providers/expense.service";

const mockGroups: Group[] = [
  {id: 1, name: "Vacation Planning"},
  {id: 2, name: "Office Supplies"},
  {id: 3, name: "Birthday Party"},
  {id: 4, name: "Wedding Fund"},
  {id: 5, name: "Monthly Bills"},
  {id: 6, name: "Road Trip"},
  {id: 7, name: "Home Renovation"},
  {id: 8, name: "Sports Club"},
  {id: 9, name: "Tech Gadgets"},
  {id: 10, name: "Book Club"}
];
const mockExpenses: Expense[] = [
  {id: 1, groupId: 1, amount: 150.00, label: "Airfare"},
  {id: 2, groupId: 1, amount: 200.00, label: "Hotel"},
  {id: 3, groupId: 1, amount: 50.00, label: "Car Rental"},
  {id: 4, groupId: 2, amount: 30.00, label: "Pens"},
  {id: 5, groupId: 2, amount: 120.00, label: "Paper"},
  {id: 6, groupId: 2, amount: 200.00, label: "Printers"},
  {id: 7, groupId: 3, amount: 100.00, label: "Cake"},
  {id: 8, groupId: 3, amount: 150.00, label: "Decorations"},
  {id: 9, groupId: 3, amount: 300.00, label: "Venue"},
  {id: 10, groupId: 4, amount: 500.00, label: "Catering"},
  {id: 11, groupId: 4, amount: 800.00, label: "Band"},
  {id: 12, groupId: 4, amount: 1500.00, label: "Photographer"},
  {id: 13, groupId: 5, amount: 120.00, label: "Electricity"},
  {id: 14, groupId: 5, amount: 30.00, label: "Water"},
  {id: 15, groupId: 5, amount: 50.00, label: "Internet"},
  {id: 16, groupId: 6, amount: 200.00, label: "Gas"},
  {id: 17, groupId: 6, amount: 150.00, label: "Accommodations"},
  {id: 18, groupId: 6, amount: 100.00, label: "Food"},
  {id: 19, groupId: 7, amount: 2000.00, label: "Materials"},
  {id: 20, groupId: 7, amount: 3000.00, label: "Labor"},
  {id: 21, groupId: 7, amount: 500.00, label: "Paint"},
  {id: 22, groupId: 8, amount: 75.00, label: "Membership Fee"},
  {id: 23, groupId: 8, amount: 50.00, label: "Equipment"},
  {id: 24, groupId: 8, amount: 20.00, label: "Refreshments"},
  {id: 25, groupId: 9, amount: 999.00, label: "Smartphone"},
  {id: 26, groupId: 9, amount: 399.00, label: "Smartwatch"},
  {id: 27, groupId: 9, amount: 199.00, label: "Headphones"},
  {id: 28, groupId: 10, amount: 15.00, label: "New Releases"},
  {id: 29, groupId: 10, amount: 25.00, label: "Classics"},
  {id: 30, groupId: 10, amount: 30.00, label: "Biographies"}
];


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private indexedDb: IndexedDbService
  ) {}

  ngOnInit() {
    // Saving mock Data for testing
    mockGroups.forEach(group => this.indexedDb.put<Group>(groupStoreDefinition.name, undefined, group).subscribe())
    mockExpenses.forEach(expense => this.indexedDb.put<Group>(expenseStoreDefinition.name, undefined, expense).subscribe())

  }
}

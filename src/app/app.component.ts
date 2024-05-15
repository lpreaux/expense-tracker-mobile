import {Component, OnInit} from '@angular/core';
import {Group, groupStoreDefinition} from "./providers/group.service";
import {IndexedDbService} from "./db/indexed-db.service";
import {Expense, expenseStoreDefinition} from "./providers/expense.service";

const mockGroups: Group[] = [
  { id: 1, name: "Planification de vacances" },
  { id: 2, name: "Fournitures de bureau" },
  { id: 3, name: "Fête d'anniversaire" },
  { id: 4, name: "Fonds de mariage" },
  { id: 5, name: "Factures mensuelles" },
  { id: 6, name: "Voyage sur la route" },
  { id: 7, name: "Rénovation de maison" },
  { id: 8, name: "Club de sport" },
  { id: 9, name: "Gadgets technologiques" },
  { id: 10, name: "Club de lecture" }
];

const mockExpenses: Expense[] = [
  { id: 1, groupId: 1, amount: 150.00, label: "Billet d'avion" },
  { id: 2, groupId: 1, amount: 200.00, label: "Hôtel" },
  { id: 3, groupId: 1, amount: 50.00, label: "Location de voiture" },
  { id: 4, groupId: 2, amount: 30.00, label: "Stylos" },
  { id: 5, groupId: 2, amount: 120.00, label: "Papier" },
  { id: 6, groupId: 2, amount: 200.00, label: "Imprimantes" },
  { id: 7, groupId: 3, amount: 100.00, label: "Gâteau" },
  { id: 8, groupId: 3, amount: 150.00, label: "Décorations" },
  { id: 9, groupId: 3, amount: 300.00, label: "Lieu" },
  { id: 10, groupId: 4, amount: 500.00, label: "Traiteur" },
  { id: 11, groupId: 4, amount: 800.00, label: "Groupe musical" },
  { id: 12, groupId: 4, amount: 1500.00, label: "Photographe" },
  { id: 13, groupId: 5, amount: 120.00, label: "Électricité" },
  { id: 14, groupId: 5, amount: 30.00, label: "Eau" },
  { id: 15, groupId: 5, amount: 50.00, label: "Internet" },
  { id: 16, groupId: 6, amount: 200.00, label: "Essence" },
  { id: 17, groupId: 6, amount: 150.00, label: "Hébergement" },
  { id: 18, groupId: 6, amount: 100.00, label: "Nourriture" },
  { id: 19, groupId: 7, amount: 2000.00, label: "Matériaux" },
  { id: 20, groupId: 7, amount: 3000.00, label: "Main-d'œuvre" },
  { id: 21, groupId: 7, amount: 500.00, label: "Peinture" },
  { id: 22, groupId: 8, amount: 75.00, label: "Cotisation" },
  { id: 23, groupId: 8, amount: 50.00, label: "Équipement" },
  { id: 24, groupId: 8, amount: 20.00, label: "Rafraîchissements" },
  { id: 25, groupId: 9, amount: 999.00, label: "Smartphone" },
  { id: 26, groupId: 9, amount: 399.00, label: "Montre intelligente" },
  { id: 27, groupId: 9, amount: 199.00, label: "Écouteurs" },
  { id: 28, groupId: 10, amount: 15.00, label: "Nouveautés" },
  { id: 29, groupId: 10, amount: 25.00, label: "Classiques" },
  { id: 30, groupId: 10, amount: 30.00, label: "Biographies" }
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

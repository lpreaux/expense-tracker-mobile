import {Component, OnInit} from '@angular/core';
import {Group, groupStoreDefinition} from "./providers/group.service";
import {IndexedDbService} from "./db/indexed-db.service";
import {Expense, expenseStoreDefinition} from "./providers/expense.service";
import {Participant, participantStoreDefinition} from "./providers/participant.service";

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
  { id: 1, groupId: 1, amount: 150.00, label: "Billet d'avion", participantId: 1 },
  { id: 2, groupId: 1, amount: 200.00, label: "Hôtel", participantId: 2 },
  { id: 3, groupId: 1, amount: 50.00, label: "Location de voiture", participantId: 3 },
  { id: 4, groupId: 2, amount: 30.00, label: "Stylos", participantId: 4 },
  { id: 5, groupId: 2, amount: 120.00, label: "Papier", participantId: 5 },
  { id: 6, groupId: 3, amount: 100.00, label: "Gâteau", participantId: 6 },
  { id: 7, groupId: 3, amount: 150.00, label: "Décorations", participantId: 7 },
  { id: 8, groupId: 4, amount: 500.00, label: "Traiteur", participantId: 8 },
  { id: 9, groupId: 4, amount: 800.00, label: "Groupe musical", participantId: 9 },
  { id: 10, groupId: 5, amount: 120.00, label: "Électricité", participantId: 10 },
  { id: 11, groupId: 6, amount: 200.00, label: "Essence", participantId: 11 },
  { id: 12, groupId: 6, amount: 150.00, label: "Hébergement", participantId: 12 },
  { id: 13, groupId: 7, amount: 2000.00, label: "Matériaux", participantId: 13 },
  { id: 14, groupId: 7, amount: 3000.00, label: "Main-d'œuvre", participantId: 14 },
  { id: 15, groupId: 8, amount: 75.00, label: "Cotisation", participantId: 15 },
  { id: 16, groupId: 8, amount: 50.00, label: "Équipement", participantId: 16 },
  { id: 17, groupId: 9, amount: 999.00, label: "Smartphone", participantId: 17 },
  { id: 18, groupId: 9, amount: 399.00, label: "Montre intelligente", participantId: 18 },
  { id: 19, groupId: 10, amount: 15.00, label: "Nouveautés", participantId: 19 },
  { id: 20, groupId: 10, amount: 25.00, label: "Classiques", participantId: 20 }
];

const mockParticipants: Participant[] = [
  { id: 1, groupId: 1, lastname: "Dupont", firstname: "Jean" },
  { id: 2, groupId: 1, lastname: "Martin", firstname: "Alice" },
  { id: 3, groupId: 1, lastname: "Bernard", firstname: "Claude" },
  { id: 4, groupId: 2, lastname: "Thomas", firstname: "Sarah" },
  { id: 5, groupId: 2, lastname: "Petit", firstname: "Luc" },
  { id: 6, groupId: 3, lastname: "Robert", firstname: "Chloé" },
  { id: 7, groupId: 3, lastname: "Richard", firstname: "Étienne" },
  { id: 8, groupId: 4, lastname: "Durand", firstname: "Marie" },
  { id: 9, groupId: 4, lastname: "Leroy", firstname: "Julien" },
  { id: 10, groupId: 5, lastname: "Moreau", firstname: "Isabelle" },
  { id: 11, groupId: 6, lastname: "Simon", firstname: "Paul" },
  { id: 12, groupId: 6, lastname: "Michel", firstname: "Sophie" },
  { id: 13, groupId: 7, lastname: "Lefevre", firstname: "Mathieu" },
  { id: 14, groupId: 7, lastname: "Lemoine", firstname: "Charlotte" },
  { id: 15, groupId: 8, lastname: "Garcia", firstname: "Emilie" },
  { id: 16, groupId: 8, lastname: "David", firstname: "Philippe" },
  { id: 17, groupId: 9, lastname: "Roux", firstname: "Nicolas" },
  { id: 18, groupId: 9, lastname: "Fontaine", firstname: "Julia" },
  { id: 19, groupId: 10, lastname: "Vincent", firstname: "Stéphane" },
  { id: 20, groupId: 10, lastname: "Muller", firstname: "Fanny" }
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
    mockExpenses.forEach(expense => this.indexedDb.put<Expense>(expenseStoreDefinition.name, undefined, expense).subscribe())
    mockParticipants.forEach(participant => this.indexedDb.put<Participant>(participantStoreDefinition.name, undefined, participant).subscribe())
  }
}

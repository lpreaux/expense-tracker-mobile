import { Injectable } from '@angular/core';

export interface Expense {
  id: number;
  amount: number;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }
}

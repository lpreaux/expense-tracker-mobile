import { InjectionToken } from "@angular/core";

export const DB_CONFIG = new InjectionToken<DbConfig>("db.config");

export interface DbConfig {
  database: string;
  version: number;
}

export const dbConfig: DbConfig = {
  database: "ExpenseTrackerMobile",
  version: 1,
};

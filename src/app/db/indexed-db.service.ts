import {Inject, Injectable} from "@angular/core";
import {
  first,
  Observable,
  ReplaySubject,
  Subject,
} from "rxjs";
import {DB_CONFIG, DbConfig} from "../db.config";
import {groupStoreDefinition} from "../providers/group.service";
import {expenseStoreDefinition} from "../providers/expense.service";

export interface IndexCreationObject {
  name: string;
  keyPath: string | string[];
  options?: IDBIndexParameters;
}

export interface StoreCreationObject {
  name: string;
  options?: IDBObjectStoreParameters;
  indexes?: IndexCreationObject[];
}

@Injectable({
  providedIn: "root",
})
export class IndexedDbService {
  get db(): Observable<IDBDatabase | undefined> {
    return this._db.asObservable();
  }

  private storesDefinition: StoreCreationObject[] = [
    groupStoreDefinition,
    expenseStoreDefinition,
  ];

  private _db: Subject<IDBDatabase | undefined> = new ReplaySubject<
    IDBDatabase | undefined
  >();
  private initialized = false;

  constructor(@Inject(DB_CONFIG) private config: DbConfig) {}

  private init() {
    console.log("Initialize IndexedDB...");

    if (!window.indexedDB) {
      this._db.next(undefined);
      this._db.complete();
    } else {
      console.log(
        `localdb - requesting open of '${this.config.database}' version ${this.config.version}`
      );

      const openRequest = indexedDB.open(
        this.config.database,
        this.config.version
      );
      openRequest.onerror = err => {
        console.error("localdb - open has error:", err);

        this._db.error(err);
        this._db.complete();
      };

      openRequest.onupgradeneeded = (e: any) => {
        console.log("localdb - upgrade needed!");

        const db: IDBDatabase = e.target.result;
        this.storesDefinition.forEach(store => {
          console.log(`localdb - creating ${store.name}`);
          IndexedDbService.createStore(db, store);
        });
      };

      openRequest.onsuccess = (e: any) => {
        console.log("localdb - open success!", e.target.result);

        const db: IDBDatabase = e.target.result;
        this._db.next(db);
      };
    }
  }

  private initializedIfNot() {
    if (!this.initialized) {
      this.initialized = true;
      this.init();
    }
  }

  getAll<T>(
    storeName: string,
    query?: IDBValidKey | IDBKeyRange | null | undefined,
    count?: number | undefined
  ): Observable<T[]> {
    this.initializedIfNot();
    console.log("localdb.getAll");
    return new Observable(subscriber => {
      try {
        console.log("localdb.getAll - subscribed!");
        this._db.pipe(first()).subscribe(db => {
          console.log("localdb.getAll - got db:", db);
          if (!db) {
            subscriber.error("IndexedDB not supported!");
            return;
          }

          const txn = db.transaction([storeName], "readonly");
          const store = txn.objectStore(storeName);
          const req = store.getAll(query, count);
          req.onerror = function (e: any) {
            console.log("localdb.getAll - store error event:", e);
            subscriber.error(e.target.error);
            return;
          };
          req.onsuccess = function (e: any) {
            console.log("localdb.getAll - store success:", e);
            subscriber.next(e.target.result);
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  getAllByIndex<T>(
    storeName: string,
    indexName: string,
    query?: IDBValidKey | IDBKeyRange | null | undefined,
    count?: number | undefined
  ): Observable<T[]> {
    this.initializedIfNot();
    console.log("localdb.getAllByIndex");
    return new Observable(subscriber => {
      try {
        console.log("localdb.getAllByIndex - subscribed!");
        this._db.pipe(first()).subscribe(db => {
          console.log("localdb.getAll - got db:", db);
          if (!db) {
            subscriber.error("IndexedDB not supported!");
            return;
          }

          const txn = db.transaction([storeName], "readonly");
          const store = txn.objectStore(storeName);
          const index = store.index(indexName);
          const req = index.getAll(query, count);
          req.onerror = function (e: any) {
            console.log("localdb.getAllByIndex - store error event:", e);
            subscriber.error(e.target.error);
            return;
          };
          req.onsuccess = function (e: any) {
            console.log("localdb.getAllByIndex - store success:", e);
            subscriber.next(e.target.result);
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  get<T>(storeName: string, key: any): Observable<T> {
    this.initializedIfNot();
    console.log("localdb.get");
    return new Observable(subscriber => {
      try {
        console.log("localdb.get - subscribed!");
        this._db.pipe(first()).subscribe(db => {
          console.log("localdb.get - got db:", db);
          if (!db) {
            subscriber.error("IndexedDB not supported!");
            return;
          }

          const txn = db.transaction([storeName], "readonly");
          const store = txn.objectStore(storeName);
          const req = store.get(key);
          req.onerror = function (e: any) {
            console.log("localdb.get - store error event:", e);
            subscriber.error(e.target.error);
            return;
          };
          req.onsuccess = function (e: any) {
            console.log("localdb.get - store success:", e);
            subscriber.next(e.target.result);
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  put<T>(
    storeName: string,
    key: IDBValidKey | undefined,
    value: Partial<T>
  ): Observable<IDBValidKey> {
    this.initializedIfNot();
    console.log("localdb.put");
    return new Observable(subscriber => {
      try {
        console.log("localdb.put - subscribed!");
        this._db.pipe(first()).subscribe(db => {
          console.log("localdb.put - got db:", db);
          if (!db) {
            subscriber.error("IndexedDB not supported!");
            return;
          }

          const txn = db.transaction([storeName], "readwrite");
          const store = txn.objectStore(storeName);
          const req = store.put(value, key);
          req.onerror = function (e: any) {
            console.log("localdb.put - store error event:", e);
            subscriber.error(e.target.error);
            return;
          };
          req.onsuccess = function (e: any) {
            console.log("localdb.put - store success:", e);
            subscriber.next(e.target.result);
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  static createStore(db: IDBDatabase, storeDef: StoreCreationObject) {
    const store = db.createObjectStore(storeDef.name, storeDef.options);
    storeDef.indexes?.forEach(indexDef => this.createIndex(store, indexDef));
  }

  static createIndex(store: IDBObjectStore, indexDef: IndexCreationObject) {
    store.createIndex(indexDef.name, indexDef.keyPath, indexDef.options);
  }
}

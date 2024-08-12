// src/services/indexedDBService.js
import { openDB } from 'idb';

const DB_NAME = 'my-database';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'clients';

export async function initializeDB() {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          db.createObjectStore(OBJECT_STORE_NAME);
          console.log('Object store created.');
        }
      },
    });
  }
  
  export async function loadClients() {
    try {
      const db = await initializeDB();
      const clients = await db.get(OBJECT_STORE_NAME, 'clients-data');
      console.log('Clients loaded:', clients);
      return clients;
    } catch (error) {
      console.error('Failed to load clients from IndexedDB:', error);
      throw error;
    }
  }
  
  export async function saveClients(clients) {
    try {
      const db = await initializeDB();
      const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
      const store = tx.objectStore(OBJECT_STORE_NAME);
  
      await store.put(clients, 'clients-data');
      await tx.done; // Wait for transaction to complete
  
      console.log('Clients saved successfully:', clients);
    } catch (error) {
      console.error('Failed to save clients to IndexedDB:', error);
      throw error;
    }
  }
  
  export async function deleteDB() {
    try {
      await indexedDB.deleteDatabase(DB_NAME);
      console.log('Database deleted successfully.');
    } catch (error) {
      console.error('Failed to delete database:', error);
      throw error;
    }
  }
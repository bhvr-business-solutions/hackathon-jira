import { IStore } from './IStore';
import { MemoryStore } from './memoryStore';

export class Store {
    private static _instance: MemoryStore;
    public getInstance(): IStore {
        if (!Store._instance){
            Store._instance = new MemoryStore();
        }
        return Store._instance;
    }
}
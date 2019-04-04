import { IStore } from './IStore';

export class MemoryStore implements IStore{
    private values: any = {};
    public load(key: string) {
        return this.values[key];
    }
    public save = function(key: string, value: any) {
        this.values[key] = value;
    }
}
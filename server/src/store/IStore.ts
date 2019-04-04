export interface IStore {
  save(key: string, value:any): void;
  load(key:string): any; 
}
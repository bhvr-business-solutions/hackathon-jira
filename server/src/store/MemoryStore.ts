export class MemoryStore<T extends {id: string}> {
  private _items: T[] = [];

  public getAll(): T[] {
    return this._items;
  }

  public getById(id: string): T {
    return this._items.find(i => i.id === id);
  }

  public save(item: T): this {
    const index = this._items.findIndex(i => i.id === item.id);
    if (index < 0) {
      this._items.push(item);
    } else {
      this._items.splice(index, 1, item);
    }

    return this;
  }

  public deleteById(id: string) {
    this._items = this._items.filter(i => i.id !== id);
  }
}

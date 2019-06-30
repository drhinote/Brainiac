import { Entity } from './entity';
import { LocalPersistenceContext } from './local-persistence-context';

export class EntitySet {
  
  name: string;
  public idx: {} = {};
  public items: Entity[] = [];
  public newItems: string[] = [];
  persistence: LocalPersistenceContext;

  constructor(name: string, persistence: LocalPersistenceContext) {
    this.name = name;
    this.persistence = persistence;
    this.items = JSON.parse(this.persistence.read(this.name)||"[]");
    this.newItems = JSON.parse(this.persistence.read(this.name+'new')||"[]");
    this.idx = JSON.parse(this.persistence.read(this.name+'idx')||"{}");
  }

  public find(id: string) : Entity {
    return this.items[this.idx[id]];
  }

  public addOrUpdate(item: Entity) {
    this.items.push(item);
    this.newItems.push(item.Id);
    this.idx[item.Id] = this.items.length-1;
  }

  public save() {
    this.persistence.write(this.name, JSON.stringify(this.items));    
    this.persistence.write(this.name+"new", JSON.stringify(this.newItems));
    this.persistence.write(this.name+"idx", JSON.stringify(this.idx));
  }

  public clear() {
    this.items = [];
    this.newItems = [];
    this.idx = {};
  }
  
  public getAll() : Entity[] {
    return this.items;
  }

  public getUpdates() : Entity[] {
    return this.newItems.map(key => this.items[this.idx[key]]);
  }
}
import { Entity } from './entity';
import { LocalPersistenceContext } from './local-persistence-context';

export class EntitySet {
  
  name: string;
  idx: {} = {};
  public items: Entity[] = [];
  newItems: string[] = [];
  persistence: LocalPersistenceContext;

  constructor(name: string, persistence: LocalPersistenceContext) {
    this.name = name;
    this.persistence = persistence;
    this.items = JSON.parse(this.persistence.read(this.name)||"[]");
    this.newItems = JSON.parse(this.persistence.read(this.name+'new')||"[]");
  }

  public find(id: string) : Entity {
    return this.items[id];
  }

  public addOrUpdate(item: Entity) {
    this.items[item.Id] = item;
    this.newItems.push(item.Id);

  }

  public save() {
    this.persistence.write(this.name, JSON.stringify(this.items));    
    this.persistence.write(this.name+"new", JSON.stringify(this.newItems));
  }

  public clear() {
    this.items = [];
    this.newItems = [];
  }
  
  public getAll() : Entity[] {
    return this.items;
  }

  public getUpdates() : Entity[] {
    return this.newItems.map(key => this.items[key]);
  }
}
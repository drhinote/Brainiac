import { Entity } from './entity';
import { LocalPersistenceContext } from './local-persistence-context';

export class EntitySet {
  
  name: string;
  items: Entity[];
  persistence: LocalPersistenceContext;

  constructor(name: string, persistence: LocalPersistenceContext) {
    this.name = name;
    this.persistence = persistence;
  }

  public find(id: string) : Entity {
    return null;
  }

  public addOrUpdate(item: Entity) {

  }

  public save() {

  }

  public clear() {
    
  }
  
  public getAll() : Entity[] {
    return null;
  }

  public getUpdates() : Entity[] {
    return null;
  }
}
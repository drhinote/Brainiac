import { Entity } from './entity';

export class EntitySet {
  
  name: string;
  items: Entity[];

  constructor(name: string) {
    this.name = name;
  }

  public find(id: string) : Entity {
    return null;
  }

  public addOrUpdate(item: Entity) {

  }
  
  public getAll() : Entity[] {
    return null;
  }

  public getNew() : Entity[] {
    return null;
  }
}
/**
 * CreateEntityCommand
 * Command for creating a new entity
 */

import { BaseCommand } from './Command';

export class CreateEntityCommand extends BaseCommand {
  readonly name: string = 'Create Entity';
  
  private entityId: string;
  private entityData: any;
  private parentId: string | null;
  
  constructor(entityData: any, parentId: string | null = null) {
    super();
    this.entityId = this.generateId();
    this.entityData = entityData;
    this.parentId = parentId;
  }
  
  execute(): void {
    // TODO: Create entity in scene
    console.log(`Creating entity ${this.entityId}:`, this.entityData);
  }
  
  undo(): void {
    // TODO: Remove entity from scene
    console.log(`Removing entity ${this.entityId}`);
  }
  
  getEntityId(): string {
    return this.entityId;
  }
  
  private generateId(): string {
    return `entity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

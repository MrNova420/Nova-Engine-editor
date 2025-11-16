/**
 * DeleteEntityCommand
 * Command for deleting an entity
 */

import { BaseCommand } from './Command';

export class DeleteEntityCommand extends BaseCommand {
  readonly name: string = 'Delete Entity';
  
  private entityId: string;
  private entityData: any;
  private parentId: string | null;
  
  constructor(entityId: string) {
    super();
    this.entityId = entityId;
    // TODO: Store entity data and parent for restoration
    this.entityData = null;
    this.parentId = null;
  }
  
  execute(): void {
    // Store entity data before deletion
    // TODO: Get entity data from scene
    this.entityData = { /* entity data */ };
    this.parentId = null; // TODO: Get parent ID
    
    // Delete the entity
    console.log(`Deleting entity ${this.entityId}`);
  }
  
  undo(): void {
    // Restore the entity
    console.log(`Restoring entity ${this.entityId}:`, this.entityData);
  }
}

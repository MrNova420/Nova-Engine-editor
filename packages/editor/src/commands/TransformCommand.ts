/**
 * TransformCommand
 * Command for transforming entity position, rotation, or scale
 */

import { BaseCommand } from './Command';

export interface TransformData {
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
}

export class TransformCommand extends BaseCommand {
  readonly name: string;
  
  private entityId: string;
  private oldTransform: TransformData;
  private newTransform: TransformData;
  
  constructor(
    entityId: string,
    oldTransform: TransformData,
    newTransform: TransformData,
    name: string = 'Transform Entity'
  ) {
    super();
    this.entityId = entityId;
    this.oldTransform = oldTransform;
    this.newTransform = newTransform;
    this.name = name;
  }
  
  execute(): void {
    this.applyTransform(this.newTransform);
  }
  
  undo(): void {
    this.applyTransform(this.oldTransform);
  }
  
  private applyTransform(transform: TransformData): void {
    // TODO: Apply transform to entity
    console.log(`Applying transform to entity ${this.entityId}:`, transform);
  }
  
  override canMergeWith(other: import('./Command').Command): boolean {
    if (!(other instanceof TransformCommand)) {
      return false;
    }
    
    // Only merge if it's the same entity
    return this.entityId === other.entityId;
  }
  
  override mergeWith(other: import('./Command').Command): void {
    if (other instanceof TransformCommand) {
      // Update new transform to the other command's new transform
      this.newTransform = other.newTransform;
    }
  }
}

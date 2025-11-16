/**
 * SelectTool
 * Tool for selecting entities in the scene
 */

import { BaseTool } from './Tool';

export class SelectTool extends BaseTool {
  name = 'Select';
  icon = 'pointer';
  hotkey = 'Q';
  
  private selectedEntities: Set<string> = new Set();
  private selectionBox: { start: { x: number; y: number }; end: { x: number; y: number } } | null = null;
  
  onActivate(): void {
    super.onActivate();
    console.log('Select tool activated');
  }
  
  onMouseDown(x: number, y: number, button: number): void {
    super.onMouseDown(x, y, button);
    
    if (button === 0) {
      // Start selection box
      this.selectionBox = {
        start: { x, y },
        end: { x, y },
      };
      
      // TODO: Raycast to select entity under cursor
      this.performRaycast(x, y);
    }
  }
  
  onMouseMove(x: number, y: number): void {
    if (this.isDragging && this.selectionBox) {
      // Update selection box
      this.selectionBox.end = { x, y };
    }
  }
  
  onMouseUp(x: number, y: number, button: number): void {
    super.onMouseUp(x, y, button);
    
    if (button === 0 && this.selectionBox) {
      // Finalize selection
      this.performBoxSelection();
      this.selectionBox = null;
    }
  }
  
  onKeyDown(key: string): void {
    if (key === 'Shift') {
      // Multi-select mode
    } else if (key === 'Escape') {
      // Clear selection
      this.clearSelection();
    }
  }
  
  private performRaycast(x: number, y: number): void {
    // TODO: Implement raycasting
    // 1. Convert screen coords to world ray
    // 2. Test ray against scene entities
    // 3. Select closest hit
    console.log(`Raycast at (${x}, ${y})`);
  }
  
  private performBoxSelection(): void {
    if (!this.selectionBox) return;
    
    // TODO: Implement box selection
    // 1. Get all entities within box bounds
    // 2. Add to selection
    console.log('Box selection:', this.selectionBox);
  }
  
  private clearSelection(): void {
    this.selectedEntities.clear();
    console.log('Selection cleared');
  }
  
  update(deltaTime: number): void {
    // Update selection state
  }
  
  render(context: any): void {
    // Render selection box if dragging
    if (this.selectionBox) {
      // TODO: Render selection rectangle
    }
    
    // Render selection outline for selected entities
    for (const entityId of this.selectedEntities) {
      // TODO: Render outline
    }
  }
}

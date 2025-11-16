/**
 * ScaleTool
 * Tool for scaling entities
 */

import { BaseTool } from './Tool';

export class ScaleTool extends BaseTool {
  name = 'Scale';
  icon = 'maximize';
  hotkey = 'R';
  
  private dragStart: { x: number; y: number } | null = null;
  private dragAxis: 'x' | 'y' | 'z' | 'uniform' | null = null;
  private initialScale: { x: number; y: number; z: number } | null = null;
  private uniformScale: boolean = false;
  
  onActivate(): void {
    super.onActivate();
    console.log('Scale tool activated');
  }
  
  onMouseDown(x: number, y: number, button: number): void {
    super.onMouseDown(x, y, button);
    
    if (button === 0) {
      this.dragStart = { x, y };
      
      // TODO: Detect which scale gizmo was clicked
      this.dragAxis = this.detectGizmoAxis(x, y);
      
      // Store initial scale
      // TODO: Get from selected entity
      this.initialScale = { x: 1, y: 1, z: 1 };
    }
  }
  
  onMouseMove(x: number, y: number): void {
    if (this.isDragging && this.dragStart && this.dragAxis) {
      const deltaX = x - this.dragStart.x;
      const deltaY = y - this.dragStart.y;
      
      // Calculate scale factor based on mouse movement
      this.updateEntityScale(deltaX, deltaY);
    }
  }
  
  onMouseUp(x: number, y: number, button: number): void {
    super.onMouseUp(x, y, button);
    
    this.dragStart = null;
    this.dragAxis = null;
    this.initialScale = null;
  }
  
  onKeyDown(key: string): void {
    if (key === 'Shift') {
      this.uniformScale = true;
      this.dragAxis = 'uniform';
    } else if (key === 'x' || key === 'X') {
      this.dragAxis = 'x';
    } else if (key === 'y' || key === 'Y') {
      this.dragAxis = 'y';
    } else if (key === 'z' || key === 'Z') {
      this.dragAxis = 'z';
    }
  }
  
  onKeyUp(key: string): void {
    if (key === 'Shift') {
      this.uniformScale = false;
    }
  }
  
  private detectGizmoAxis(x: number, y: number): 'x' | 'y' | 'z' | 'uniform' | null {
    // TODO: Implement gizmo hit detection
    // Return which scale handle was clicked
    return null;
  }
  
  private updateEntityScale(deltaX: number, deltaY: number): void {
    if (!this.initialScale) return;
    
    // Calculate scale factor
    const scaleSensitivity = 0.01;
    const delta = (deltaX + deltaY) * scaleSensitivity;
    const scaleFactor = 1 + delta;
    
    // Prevent negative or zero scale
    const clampedFactor = Math.max(0.01, scaleFactor);
    
    let newScaleX = this.initialScale.x;
    let newScaleY = this.initialScale.y;
    let newScaleZ = this.initialScale.z;
    
    if (this.dragAxis === 'uniform' || this.uniformScale) {
      // Uniform scaling
      newScaleX *= clampedFactor;
      newScaleY *= clampedFactor;
      newScaleZ *= clampedFactor;
    } else {
      // Axis-specific scaling
      switch (this.dragAxis) {
        case 'x':
          newScaleX *= clampedFactor;
          break;
        case 'y':
          newScaleY *= clampedFactor;
          break;
        case 'z':
          newScaleZ *= clampedFactor;
          break;
      }
    }
    
    // Clamp scale values
    newScaleX = Math.max(0.01, newScaleX);
    newScaleY = Math.max(0.01, newScaleY);
    newScaleZ = Math.max(0.01, newScaleZ);
    
    console.log(`New scale: (${newScaleX.toFixed(2)}, ${newScaleY.toFixed(2)}, ${newScaleZ.toFixed(2)})`);
  }
  
  update(deltaTime: number): void {
    // Update tool state
  }
  
  render(context: any): void {
    // TODO: Render scale gizmo
    // - X axis line with cube handle (red)
    // - Y axis line with cube handle (green)
    // - Z axis line with cube handle (blue)
    // - Center cube for uniform scaling (white)
  }
}

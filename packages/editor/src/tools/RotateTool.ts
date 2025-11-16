/**
 * RotateTool
 * Tool for rotating entities
 */

import { BaseTool } from './Tool';

export class RotateTool extends BaseTool {
  name = 'Rotate';
  icon = 'rotate-ccw';
  hotkey = 'E';
  
  private dragStart: { x: number; y: number } | null = null;
  private dragAxis: 'x' | 'y' | 'z' | null = null;
  private initialRotation: { x: number; y: number; z: number } | null = null;
  private snapAngle: number = 15; // degrees
  private enableSnap: boolean = false;
  
  onActivate(): void {
    super.onActivate();
    console.log('Rotate tool activated');
  }
  
  onMouseDown(x: number, y: number, button: number): void {
    super.onMouseDown(x, y, button);
    
    if (button === 0) {
      this.dragStart = { x, y };
      
      // TODO: Detect which rotation gizmo was clicked
      this.dragAxis = this.detectGizmoAxis(x, y);
      
      // Store initial rotation
      // TODO: Get from selected entity
      this.initialRotation = { x: 0, y: 0, z: 0 };
    }
  }
  
  onMouseMove(x: number, y: number): void {
    if (this.isDragging && this.dragStart && this.dragAxis) {
      const deltaX = x - this.dragStart.x;
      const deltaY = y - this.dragStart.y;
      
      // Calculate rotation angle based on mouse movement
      this.updateEntityRotation(deltaX, deltaY);
    }
  }
  
  onMouseUp(x: number, y: number, button: number): void {
    super.onMouseUp(x, y, button);
    
    this.dragStart = null;
    this.dragAxis = null;
    this.initialRotation = null;
  }
  
  onKeyDown(key: string): void {
    if (key === 'Shift') {
      this.enableSnap = true;
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
      this.enableSnap = false;
    }
  }
  
  private detectGizmoAxis(x: number, y: number): 'x' | 'y' | 'z' | null {
    // TODO: Implement gizmo hit detection
    // Return which rotation ring was clicked
    return null;
  }
  
  private updateEntityRotation(deltaX: number, deltaY: number): void {
    if (!this.initialRotation) return;
    
    // Calculate rotation angle (in degrees)
    const rotationSensitivity = 0.5;
    let angle = 0;
    
    switch (this.dragAxis) {
      case 'x':
        angle = deltaY * rotationSensitivity;
        break;
      case 'y':
        angle = deltaX * rotationSensitivity;
        break;
      case 'z':
        angle = -deltaX * rotationSensitivity;
        break;
    }
    
    // Apply angle snapping
    if (this.enableSnap) {
      angle = Math.round(angle / this.snapAngle) * this.snapAngle;
    }
    
    let newRotX = this.initialRotation.x;
    let newRotY = this.initialRotation.y;
    let newRotZ = this.initialRotation.z;
    
    switch (this.dragAxis) {
      case 'x':
        newRotX += angle;
        break;
      case 'y':
        newRotY += angle;
        break;
      case 'z':
        newRotZ += angle;
        break;
    }
    
    // Normalize to 0-360 range
    newRotX = ((newRotX % 360) + 360) % 360;
    newRotY = ((newRotY % 360) + 360) % 360;
    newRotZ = ((newRotZ % 360) % 360) % 360;
    
    console.log(`New rotation: (${newRotX.toFixed(1)}°, ${newRotY.toFixed(1)}°, ${newRotZ.toFixed(1)}°)`);
  }
  
  update(deltaTime: number): void {
    // Update tool state
  }
  
  render(context: any): void {
    // TODO: Render rotation gizmo
    // - X axis ring (red)
    // - Y axis ring (green)
    // - Z axis ring (blue)
    // - Screen-space ring (white)
  }
}

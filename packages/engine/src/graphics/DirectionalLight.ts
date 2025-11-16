/**
 * DirectionalLight
 *
 * A light that illuminates all objects equally from a specific direction.
 * Similar to sunlight - has direction but no position (infinitely far away).
 */

import { Light, LightType } from './Light';
import { Vector3 } from '../math/Vector3';

/**
 * Directional light component (sun-like light)
 */
export class DirectionalLight extends Light {
  private _direction: Vector3;

  constructor() {
    super(LightType.Directional);
    this._direction = new Vector3(0, -1, 0); // Default: pointing down
    this._intensity = 1.0;
  }

  /**
   * Set light direction
   * @param direction - Direction vector (will be normalized)
   */
  setDirection(direction: Vector3): void {
    this._direction = direction.clone().normalize();
  }

  /**
   * Get light direction
   */
  get direction(): Vector3 {
    return this._direction.clone();
  }
}

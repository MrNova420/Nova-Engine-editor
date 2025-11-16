/**
 * WebGLRenderer
 *
 * WebGL 2.0 implementation of the renderer interface.
 * Handles WebGL context creation, state management, and rendering operations.
 */

import { IRenderer } from './Renderer';
import { Scene } from '../scene/Scene';
import { Camera } from './Camera';
import { RenderPipeline } from './RenderPipeline';

/**
 * WebGL 2.0 Renderer implementation
 */
export class WebGLRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement | null = null;
  private _gl: WebGL2RenderingContext | null = null;
  private _pipeline: RenderPipeline | null = null;
  private _width: number = 0;
  private _height: number = 0;

  /**
   * Initialize the renderer with a canvas
   * @param canvas - The HTML canvas element to render to
   */
  async initialize(canvas: HTMLCanvasElement): Promise<void> {
    this._canvas = canvas;

    // Get WebGL 2.0 context
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      depth: true,
      stencil: false,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      throw new Error(
        'WebGL 2.0 is not supported in this browser. Please use a modern browser.'
      );
    }

    this._gl = gl;
    this._width = canvas.width;
    this._height = canvas.height;

    // Initialize render pipeline
    this._pipeline = new RenderPipeline(gl);

    // Set up initial WebGL state
    this.setupWebGLState();

    console.log('WebGL 2.0 Renderer initialized successfully');
    console.log('Vendor:', gl.getParameter(gl.VENDOR));
    console.log('Renderer:', gl.getParameter(gl.RENDERER));
    console.log('Version:', gl.getParameter(gl.VERSION));
  }

  /**
   * Set up initial WebGL state
   */
  private setupWebGLState(): void {
    if (!this._gl) return;

    const gl = this._gl;

    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // Enable backface culling
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);

    // Set clear color (dark gray)
    gl.clearColor(0.1, 0.1, 0.1, 1.0);

    // Set viewport
    gl.viewport(0, 0, this._width, this._height);
  }

  /**
   * Render a scene from a camera's perspective
   * @param scene - The scene to render
   * @param camera - The camera to render from
   */
  render(_scene: Scene, _camera: Camera): void {
    if (!this._gl || !this._pipeline) {
      console.error('Renderer not initialized');
      return;
    }

    // Clear the screen
    this._pipeline.clear();

    // TODO: Implement actual rendering once we have shaders and meshes
    // For now, this just clears the screen

    // Future implementation will:
    // 1. Get all entities with mesh renderers from the scene
    // 2. Sort by material/shader to minimize state changes
    // 3. For each entity:
    //    - Set up shader uniforms (model, view, projection matrices)
    //    - Bind material textures
    //    - Draw mesh

    // Check for WebGL errors
    this.checkGLError();
  }

  /**
   * Resize the rendering viewport
   * @param width - New width in pixels
   * @param height - New height in pixels
   */
  resize(width: number, height: number): void {
    if (!this._canvas || !this._gl) return;

    this._width = width;
    this._height = height;

    // Update canvas size
    this._canvas.width = width;
    this._canvas.height = height;

    // Update WebGL viewport
    this._gl.viewport(0, 0, width, height);

    console.log(`Renderer resized to ${width}x${height}`);
  }

  /**
   * Clean up and destroy the renderer
   */
  destroy(): void {
    if (this._pipeline) {
      this._pipeline.destroy();
      this._pipeline = null;
    }

    // Lose WebGL context
    if (this._canvas && this._gl) {
      const loseContext = this._gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
    }

    this._gl = null;
    this._canvas = null;

    console.log('WebGL Renderer destroyed');
  }

  /**
   * Get the underlying WebGL context
   */
  getContext(): WebGL2RenderingContext | null {
    return this._gl;
  }

  /**
   * Check for WebGL errors and log them
   */
  private checkGLError(): void {
    if (!this._gl) return;

    const error = this._gl.getError();
    if (error !== this._gl.NO_ERROR) {
      let errorString = 'Unknown error';
      switch (error) {
        case this._gl.INVALID_ENUM:
          errorString = 'INVALID_ENUM';
          break;
        case this._gl.INVALID_VALUE:
          errorString = 'INVALID_VALUE';
          break;
        case this._gl.INVALID_OPERATION:
          errorString = 'INVALID_OPERATION';
          break;
        case this._gl.OUT_OF_MEMORY:
          errorString = 'OUT_OF_MEMORY';
          break;
        case this._gl.INVALID_FRAMEBUFFER_OPERATION:
          errorString = 'INVALID_FRAMEBUFFER_OPERATION';
          break;
      }
      console.error(`WebGL Error: ${errorString} (${error})`);
    }
  }

  /**
   * Get canvas dimensions
   */
  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }
}

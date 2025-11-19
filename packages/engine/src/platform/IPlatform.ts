/**
 * @fileoverview Platform Abstraction Layer - Core Interface
 * @module @nova-engine/platform
 *
 * Provides a unified interface for platform-specific operations across
 * web, desktop, mobile, and other target platforms.
 *
 * Following the autonomous development guide Phase 1.1
 */

/**
 * Window configuration options
 */
export interface WindowConfig {
  /** Window title */
  title: string;
  /** Window width in pixels */
  width: number;
  /** Window height in pixels */
  height: number;
  /** Whether the window should be fullscreen */
  fullscreen?: boolean;
  /** Whether the window should be resizable */
  resizable?: boolean;
  /** Whether the window should have decorations (titlebar, etc) */
  decorated?: boolean;
  /** Initial window position X */
  x?: number;
  /** Initial window position Y */
  y?: number;
}

/**
 * Platform-agnostic window interface
 */
export interface IWindow {
  /** Get window width */
  getWidth(): number;
  /** Get window height */
  getHeight(): number;
  /** Set window size */
  setSize(width: number, height: number): void;
  /** Get window title */
  getTitle(): string;
  /** Set window title */
  setTitle(title: string): void;
  /** Check if window is fullscreen */
  isFullscreen(): boolean;
  /** Toggle fullscreen mode */
  setFullscreen(fullscreen: boolean): void;
  /** Close the window */
  close(): void;
  /** Get the underlying canvas element (web) or native window handle */
  getNativeHandle(): unknown;
}

/**
 * Main platform interface that all platform implementations must provide
 */
export interface IPlatform {
  initialize(config?: Record<string, unknown>): Promise<void>;
  shutdown(): Promise<void>;
  getName(): string;
  createWindow(config: WindowConfig): IWindow;
  now(): number;
}

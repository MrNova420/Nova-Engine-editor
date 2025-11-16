/**
 * Viewport Panel
 * 3D viewport for scene visualization with WebGL integration
 */

import React, { useRef, useEffect } from 'react';

export const Viewport: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Engine integration will be added here
    // const canvas = canvasRef.current;
    // Initialize WebGL context and renderer

    // Cleanup
    return () => {
      // Cleanup engine resources
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-900">
      {/* Viewport Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Viewport Overlay */}
      <div className="absolute top-2 left-2 bg-black/50 px-3 py-1 rounded text-xs text-white">
        Perspective | Free Camera
      </div>

      {/* Grid Toggle */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button className="bg-editor-surface hover:bg-editor-hover px-3 py-1.5 rounded text-xs border border-editor-border">
          Grid: On
        </button>
        <button className="bg-editor-surface hover:bg-editor-hover px-3 py-1.5 rounded text-xs border border-editor-border">
          Gizmos: On
        </button>
      </div>
    </div>
  );
};
